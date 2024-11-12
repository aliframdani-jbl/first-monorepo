
.PHONY: generate, tunneling, version

PUBLISH=false
FRFLAG=$(if $(FIRST_RELEASE),--first-release)
APPSFLAG=$(if $(APPS),--apps $(APPS))
EXECFLAG=$(if $(EXEC),--exec)

init:
	./setup-git-hooks.sh

run-devcontainer:
	make init && npx devcontainer build --workspace-folder . && npx devcontainer up --workspace-folder .

run-%:
	nodemon /workspace/dist/apps/$*/src/main.js

generate:
	nx generate @aliframdani-jbl/project-generator:new-project

tunneling:
	ts-node tools/tunneling/tunelling.ts

release:
	npx tsx tools/release-management/main.ts $(FRFLAG) $(APPSFLAG) $(EXECFLAG)



