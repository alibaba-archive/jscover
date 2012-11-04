TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 1000
GLOBALS = _*jscoverage

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--globals $(GLOBALS) \
		--timeout $(TIMEOUT) \
		$(TESTS)

test-cov:
	@$(MAKE) lib-cov
	@JSCOVER_COV=1 $(MAKE) test
	@JSCOVER_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

all-cov:
	@node ./bin/jscover --exclude=lib-cov --exclude=test --exclude=bin . $@

lib-cov:
	@node ./bin/jscover lib $@

.PHONY: test-cov test lib-cov all-cov
