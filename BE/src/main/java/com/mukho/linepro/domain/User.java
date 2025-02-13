package com.mukho.linepro.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Data;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class User {
	int userId;
	String id;
	String password;
	String name;
}
