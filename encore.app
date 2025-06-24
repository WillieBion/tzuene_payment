{
	"id": "tzuene-ticketing-pay-pqci",
	"lang": "typescript",
	"fs": "full",
	"cors": {
        "allow_origins": ["*"],
        "allow_methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["*"],
        "expose_headers": ["*"],
        "allow_credentials": true,
        "max_age": 86400
    },
    "build": {
        "docker": {
            "bundle_source": true
        }
    }
}
