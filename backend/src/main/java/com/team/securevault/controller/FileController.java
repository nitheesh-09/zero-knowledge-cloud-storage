package com.team.securevault.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.team.securevault.dto.FileResponse;
import com.team.securevault.entity.File;
import com.team.securevault.entity.User;
import com.team.securevault.repository.UserRepository;
import com.team.securevault.service.FileService;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private final FileService fileService;
    private final UserRepository userRepository;

    public FileController(
            FileService fileService,
            UserRepository userRepository
    ) {
        this.fileService = fileService;
        this.userRepository = userRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile multipartFile,
            Authentication authentication
    ) throws IOException {

        // Check whether a file was actually uploaded
        if (multipartFile.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("File cannot be empty");
        }

        // Check maximum file size
        if (multipartFile.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.badRequest()
                    .body("File size cannot exceed 10 MB");
        }

        String originalFilename = multipartFile.getOriginalFilename();

        // Check filename
        if (originalFilename == null || originalFilename.isBlank()) {
            return ResponseEntity.badRequest()
                    .body("Invalid filename");
        }

        // Remove any path information from the filename
        String safeFilename = Paths.get(originalFilename)
                .getFileName()
                .toString();

        // Prevent invalid filename after sanitization
        if (safeFilename.isBlank()
                || safeFilename.equals(".")
                || safeFilename.equals("..")) {
            return ResponseEntity.badRequest()
                    .body("Invalid filename");
        }

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        Path uploadDirectory = Paths.get("uploads")
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(uploadDirectory);

        String filename = System.currentTimeMillis()
                + "_" + safeFilename;

        Path filePath = uploadDirectory
                .resolve(filename)
                .normalize();

        // Make sure the final path stays inside uploads/
        if (!filePath.startsWith(uploadDirectory)) {
            return ResponseEntity.badRequest()
                    .body("Invalid file path");
        }

        Files.copy(
                multipartFile.getInputStream(),
                filePath
        );

        File file = fileService.saveFile(
                safeFilename,
                filePath.toString(),
                multipartFile.getSize(),
                user
        );

        return ResponseEntity.ok(file.getId());
    }

    @GetMapping
    public ResponseEntity<?> getUserFiles(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        List<File> files = fileService.getUserFiles(user);

        List<FileResponse> response = files.stream()
                .map(file -> new FileResponse(
                        file.getId(),
                        file.getOriginalFilename(),
                        file.getFileSize(),
                        file.getUploadedAt()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<?> downloadFile(
            @PathVariable Long id,
            Authentication authentication
    ) throws IOException {

        String email = authentication.getName();

        User authenticatedUser = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        File file = fileService.getFileById(id);

        if (!file.getOwner().getId().equals(authenticatedUser.getId())) {
            return ResponseEntity.status(403).body("Access denied");
        }

        Path filePath = Paths.get(file.getStoragePath());

        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }

        byte[] fileContent = Files.readAllBytes(filePath);

        return ResponseEntity.ok()
                .header(
                        "Content-Disposition",
                        "attachment; filename=\"" +
                        file.getOriginalFilename() + "\""
                )
                .body(fileContent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(
            @PathVariable Long id,
            Authentication authentication
    ) throws IOException {

        String email = authentication.getName();

        User authenticatedUser = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        File file = fileService.getFileById(id);

        if (!file.getOwner().getId().equals(authenticatedUser.getId())) {
            return ResponseEntity.status(403).body("Access denied");
        }

        fileService.deleteFile(file);

        return ResponseEntity.ok("File deleted successfully");
    }
}