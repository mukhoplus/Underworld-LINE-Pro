package com.mukho.linepro.domain;

public enum RoomType {
	ME("ME"), ONE_TO_ONE("ONE_TO_ONE"), GROUP("GROUP");

	private final String value;

	RoomType(String value) {
		this.value = value;
	}

	public static RoomType fromString(String value) {
		for (RoomType type : RoomType.values()) {
			if (type.value.equalsIgnoreCase(value)) {
				return type;
			}
		}
		throw new IllegalArgumentException("Unknown room type: " + value);
	}

	@Override
	public String toString() {
		return this.value;
	}
} 