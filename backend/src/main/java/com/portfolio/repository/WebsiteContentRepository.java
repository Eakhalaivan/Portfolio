package com.portfolio.repository;

import com.portfolio.model.WebsiteContent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebsiteContentRepository extends MongoRepository<WebsiteContent, String> {
}
