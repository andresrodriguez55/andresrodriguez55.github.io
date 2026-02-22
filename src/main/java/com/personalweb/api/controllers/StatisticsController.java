package com.personalweb.api.controllers;

import com.personalweb.business.abstracts.StatisticsService;
import com.personalweb.business.dto.responses.get.GetAllCommentsCountPerCountriesResponse;
import com.personalweb.business.dto.responses.get.GetAllCommentsCountPerMonthsResponse;
import com.personalweb.business.dto.responses.get.GetAllMoreCommentedPostsResponse;
import com.personalweb.business.dto.responses.get.GetAllMostCommentersResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService statisticsService;

    //TODO disable orderby
    //TODO LIMIT COUNT
    @GetMapping("/posts")
    public ResponseEntity<Page<GetAllMoreCommentedPostsResponse>> getMoreCommentedPosts(@ParameterObject
                                                                                        @PageableDefault(page = 0,
                                                                                                size = 5)
                                                                                        Pageable pageable) {
        return new ResponseEntity<>(statisticsService.getMoreCommentedPosts(pageable), HttpStatus.OK);
    }

    @GetMapping("/comments")
    public ResponseEntity<Page<GetAllMostCommentersResponse>> getMostCommenters(@ParameterObject
                                                                                @PageableDefault(page = 0, size = 5)
                                                                                Pageable pageable) {
        return new ResponseEntity<>(statisticsService.getMostCommenters(pageable), HttpStatus.OK);
    }

    @GetMapping("/months")
    public ResponseEntity<List<GetAllCommentsCountPerMonthsResponse>> getCommentsCountPerMonth() {
        return new ResponseEntity<>(statisticsService.getCommentsCountPerMonth(), HttpStatus.OK);
    }

    @GetMapping("/countries")
    public ResponseEntity<List<GetAllCommentsCountPerCountriesResponse>> getCommentsCountPerCountry() {
        return new ResponseEntity<>(statisticsService.getCommentsCountPerCountry(), HttpStatus.OK);
    }
}
