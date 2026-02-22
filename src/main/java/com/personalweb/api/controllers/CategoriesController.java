package com.personalweb.api.controllers;

import com.personalweb.business.abstracts.CategoryService;
import com.personalweb.business.dto.requests.create.CreateCategoryRequest;
import com.personalweb.business.dto.requests.update.UpdateCategoryRequest;
import com.personalweb.business.dto.responses.create.CreateCategoryResponse;
import com.personalweb.business.dto.responses.get.GetAllCategoriesResponse;
import com.personalweb.business.dto.responses.update.UpdateCategoryResponse;
import com.personalweb.common.constants.Roles;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping(path = "/api/v1/categories")
@RequiredArgsConstructor
public class CategoriesController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<GetAllCategoriesResponse>> getAll() {
        return new ResponseEntity<>(categoryService.getAll(), HttpStatus.OK);
    }

    @RolesAllowed(Roles.ADMIN)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CreateCategoryResponse> add(@Valid @RequestBody CreateCategoryRequest request) {
        return new ResponseEntity<>(categoryService.add(request), HttpStatus.CREATED);
    }

    @RolesAllowed(Roles.ADMIN)
    @PutMapping(path = "/{id}")
    public ResponseEntity<UpdateCategoryResponse> update(@PathVariable("id") long id,
                                                         @Valid @RequestBody UpdateCategoryRequest request) {
        return new ResponseEntity<>(categoryService.update(id, request), HttpStatus.NO_CONTENT);
    }

    @RolesAllowed(Roles.ADMIN)
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> remove(@PathVariable("id") long id) {
        categoryService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}