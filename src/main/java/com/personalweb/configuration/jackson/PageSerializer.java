package com.personalweb.configuration.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Page;

import java.io.IOException;


//todo increment performance, centralized config
//@JsonComponent
public class PageSerializer extends JsonSerializer<Page> {
    @Override
    public Class<Page> handledType() {
        return Page.class;
    }

    @Override
    public void serialize(Page page, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        jsonGenerator.writeObjectField("content", page.getContent());
        jsonGenerator.writeObjectFieldStart("pageable");
        jsonGenerator.writeBooleanField("first", page.isFirst());
        jsonGenerator.writeBooleanField("last", page.isLast());
//        jsonGenerator.writeBooleanField("empty", page.isEmpty());
        jsonGenerator.writeNumberField("totalPages", page.getTotalPages());
        jsonGenerator.writeNumberField("totalElements", page.getTotalElements());
        jsonGenerator.writeNumberField("numberOfElements", page.getNumberOfElements());
        jsonGenerator.writeNumberField("pageSize", page.getSize());
        jsonGenerator.writeNumberField("pageNumber", page.getNumber());

        jsonGenerator.writeEndObject();

//        jsonGenerator.writeArrayFieldStart("sort");
//        Sort sort = page.getSort();
//        for (Sort.Order order : sort) {
//            jsonGenerator.writeStartObject();
//            jsonGenerator.writeStringField("property", order.getProperty());
//            jsonGenerator.writeStringField("direction", order.getDirection().name());
//            jsonGenerator.writeEndObject();
//        }
//        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}