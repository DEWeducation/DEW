package me.yluo.ruisiapp.api.entity;

import java.util.Date;


public class ApiResult<T> {

    public int Version;
    public String Charset;
    public T Variables;

}