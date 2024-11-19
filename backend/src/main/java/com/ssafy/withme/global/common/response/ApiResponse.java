package com.ssafy.withme.global.common.response;

import com.ssafy.withme.global.exception.ErrorCode;
import lombok.Builder;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record ApiResponse<T> (

        int status,
        @Nullable String message,
        String code,
        boolean isSuccess,
        @Nullable T data,
        String timestamp
){

    @Builder
    public ApiResponse(int status, String message, String code, boolean isSuccess, T data) {
        this(status, message, code, isSuccess, data, LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
    }

    public static <T> ApiResponse<T> onSuccess(int status, @Nullable final T data) {
        return new ApiResponse<>(status, ResponseMessage.SUCCESS.getActualMessage(), null, true, data);
    }

    public static <T> ApiResponse<T> onFailure(ErrorCode errorCode) {
        return new ApiResponse<>(errorCode.getStatus(), ResponseMessage.FAIL.getActualMessage(), errorCode.getCode(), false, null);
    }
}