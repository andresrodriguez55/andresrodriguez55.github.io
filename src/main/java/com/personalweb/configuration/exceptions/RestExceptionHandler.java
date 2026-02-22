package com.personalweb.configuration.exceptions;

import com.personalweb.common.constants.ExceptionType;
import com.personalweb.common.exceptions.BusinessException;
import com.personalweb.common.exceptions.TooManyRequestsException;
import com.personalweb.configuration.exceptions.results.ExceptionResult;
import jakarta.validation.ValidationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Iterator;

@RestControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionResult<String> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        Iterator<FieldError> iterator = exception.getBindingResult().getFieldErrors().iterator();
        return new ExceptionResult<>(
                ExceptionType.VALIDATION_EXCEPTION.name(),
                iterator.next().getDefaultMessage());
//
//
//        Map<String, String> validationErrors = new HashMap<>();
//        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
//            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
//        }
//
//        return new ExceptionResult<>(ExceptionTypes.Exception.Validation, validationErrors);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ExceptionResult<String> handleValidationException(ValidationException exception) {
        return new ExceptionResult<>(
                ExceptionType.VALIDATION_EXCEPTION.name(),
                exception.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ExceptionResult<String> handleBusinessException(BusinessException exception) {
        return new ExceptionResult<>(
                ExceptionType.BUSINESS_EXCEPTION.name(),
                exception.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    public ExceptionResult<String> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
        return new ExceptionResult<>(
                ExceptionType.DATA_INTEGRITY_VIOLATION_EXCEPTION.name(),
                exception.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResult<String> handleRuntimeException(RuntimeException exception) {
        return new ExceptionResult<>(
                ExceptionType.RUNTIME_EXCEPTION.name(),
                exception.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
    public ExceptionResult<String> handleTooManyRequestsException(TooManyRequestsException exception) {
        return new ExceptionResult<>(
                ExceptionType.TOO_MANY_REQUESTS.name(),
                exception.getMessage());
    }
}