
PUBLISH=false

generate:
	nx generate @first-monorepo/my-plugin:my-generator

release:
	if [ $(PUBLISH) == true ]; then \
		nx release --skip-publish; \
    else \
        nx release --skip-publish --dry-run; \
    fi

first-release:
	if [ $(PROJECT_NAMES) == ""]; then \
		echo "PROJECT_NAMES must be set"; \
		exit 1; \
	fi \

	if [ $(PUBLISH) == true ]; then \
		nx release --projects $(PROJECT_NAMES) --skip-publish --first-release; \
    else \
        nx release --projects $(PROJECT_NAMES) --skip-publish --first-release --dry-run; \
    fi

tunneling:
	ts-node tools/tunneling/tunelling.ts