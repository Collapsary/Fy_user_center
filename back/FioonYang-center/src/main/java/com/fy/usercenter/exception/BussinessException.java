package com.fy.usercenter.exception;

import com.fy.usercenter.common.ErrorCode;

public class BussinessException extends RuntimeException{

    private final int code;

    private final String description;

    public BussinessException(int code, String description) {
        super(description);
        this.code = code;
        this.description = description;
    }

    public BussinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
        this.description = errorCode.getDescription();
    }

    public BussinessException(ErrorCode errorCode, String description) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
        this.description = description;
    }

    public int getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}

