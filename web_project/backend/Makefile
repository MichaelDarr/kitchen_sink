#
# /home/michael/projects/kitchen_sink/web_project/backend
#

APP := backend
BIN := ./bin
DESTDIR :=
GO ?= go
PREFIX := /usr/local

GOFLAGS :=
EXTRA_GOFLAGS ?=

.PHONY: default
default: $(APP)

.PHONY: build
build: $(APP)

.PHONY: $(APP)
$(APP): ## build
	$(GO) build $(GOFLAGS) -ldflags '-s -w' $(EXTRA_GOFLAGS) -o $(BIN)/$@ ./cmd/$(APP)

.PHONY: dev
dev: ## run in dev mode (autoreloading enabled, requires gin)
	go mod download
	gin --immediate \
		--port=3000 \
		--bin=$(BIN)/$(APP) \
		--build ./cmd/$(APP) \
		--buildArgs="$(GOFLAGS) $(EXTRA_GOFLAGS)" \
		run 

.PHONY: generate
generate:
	$(GO) run -v github.com/99designs/gqlgen
