
.PHONY: generate, tunneling, version

PUBLISH=false
FRFLAG=$(if $(FIRST_RELEASE),--first-release)
APPSFLAG=$(if $(APPS),--apps $(APPS))
EXECFLAG=$(if $(EXEC),--exec)

generate:
	nx generate @aliframdani-jbl/project-generator:new-project

tunneling:
	ts-node tools/tunneling/tunelling.ts

release:
	npx tsx tools/release-management/main.ts $(FRFLAG) $(APPSFLAG) $(EXECFLAG)

