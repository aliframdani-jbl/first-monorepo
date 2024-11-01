
.PHONY: generate, tunneling, version

PUBLISH=false
FRFLAG=$(if $(FIRST_RELEASE),--first-release)
APPSFLAG=$(if $(APPS),--apps $(APPS))

generate:
	nx generate @aliframdani-jbl/project-generator:new-project

tunneling:
	ts-node tools/tunneling/tunelling.ts

release:
	npx tsx tools/release-management/release.ts $(FRFLAG) $(APPSFLAG)



# release:
# 	if [ $(PUBLISH) == true ]; then \
# 		nx release --skip-publish; \
#     else \
#         nx release --skip-publish --dry-run; \
#     fi

# first-release:
# 	if [ $(PROJECT_NAMES) == ""]; then \
# 		echo "PROJECT_NAMES must be set"; \
# 		exit 1; \
# 	fi \

# 	if [ $(PUBLISH) == true ]; then \
# 		nx release --projects $(PROJECT_NAMES) --skip-publish --first-release; \
#     else \
#         nx release --projects $(PROJECT_NAMES) --skip-publish --first-release --dry-run; \
#     fi