package com.team.securevault.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.securevault.entity.File;
import com.team.securevault.entity.User;

public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findByOwner(User owner);

}