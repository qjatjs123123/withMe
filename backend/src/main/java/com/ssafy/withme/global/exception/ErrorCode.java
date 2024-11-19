package com.ssafy.withme.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum ErrorCode {

    /**Auth*/
    INVALID_ID_TOKEN(UNAUTHORIZED, "AUTH001", "ID 토큰 검증에 실패했습니다."),

    /**Member*/
    MEMBER_NOT_FOUND(BAD_REQUEST, "MEM001", "유저를 찾을 수 없습니다. "),

    /**Repo*/
    REPO_NOT_FOUND(BAD_REQUEST, "REPO001", "해당 레파지토리가 존재하지 않습니다."),
    REPO_NOT_ALLOWED(BAD_REQUEST, "REPO002", "해당 레파지토리에 접근할 권한이 없습니다. "),

    /**OpenFeign*/
    INVALID_REQUEST(BAD_REQUEST, "Open001", "잘못된 API 호출입니다."),

    /**ChatGpt*/
    GPT_API_ERROR(BAD_REQUEST, "GPT001", "잘못된 API 호출입니다"),
    GPT_RESPONSE_EMPTY(BAD_REQUEST, "GPT002", "응답이 비어있습니다"),
    JSON_PROCESSING_ERROR(BAD_REQUEST, "GPT003", "Json 처리중 에러가 발생했습니다."),

    /**WorkSpace*/
    WORKSPACE_NOT_FOUND(BAD_REQUEST,"WORK000", "해당하는 ID의 워크스페이스가 존재하지 않습니다."),
    IMAGE_UPLOAD_FAILED(BAD_REQUEST, "WORK001", "이미지 업로드에 실패했습니다.");


    private final HttpStatus status;
    private final String code;
    private final String message;

    public int getStatus(){
        return this.status.value();
    }

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

}
