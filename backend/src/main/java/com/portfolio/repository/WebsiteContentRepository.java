package com.portfolio.repository;

import com.portfolio.model.WebsiteContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebsiteContentRepository extends JpaRepository<WebsiteContent, Long> {
}
