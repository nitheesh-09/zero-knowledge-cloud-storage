package com.team.securevault.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;

import com.team.securevault.entity.File;
import com.team.securevault.entity.User;
import com.team.securevault.exception.ResourceNotFoundException;
import com.team.securevault.repository.FileRepository;

@Service
public class FileService {

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public File saveFile(
            String originalFilename,
            String storagePath,
            Long fileSize,
            User owner
    ) {
        File file = new File(
                originalFilename,
                storagePath,
                fileSize,
                owner
        );

        return fileRepository.save(file);
    }

    public List<File> getUserFiles(User owner) {
        return fileRepository.findByOwner(owner);
    }

    public File getFileById(Long id) {
        return fileRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("File not found"));
    }

    public void deleteFile(File file) throws IOException {

        Path filePath = Paths.get(file.getStoragePath());

        if (Files.exists(filePath)) {
            Files.delete(filePath);
        }

        fileRepository.delete(file);
    }
}