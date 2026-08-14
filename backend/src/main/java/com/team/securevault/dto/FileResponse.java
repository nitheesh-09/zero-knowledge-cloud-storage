package com.team.securevault.dto;

import java.time.LocalDateTime;

public class FileResponse {

    private Long id;
    private String originalFilename;
    private Long fileSize;
    private LocalDateTime uploadedAt;

    public FileResponse(
            Long id,
            String originalFilename,
            Long fileSize,
            LocalDateTime uploadedAt
    ) {
        this.id = id;
        this.originalFilename = originalFilename;
        this.fileSize = fileSize;
        this.uploadedAt = uploadedAt;
    }

    public Long getId() {
        return id;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }
}