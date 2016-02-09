SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  globalEvaluationScope: false,
  transpiler: "plugin-babel",

  map: {
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "babel-preset-stage-0": "npm:babel-preset-stage-0@6.3.13",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "chai": "npm:chai@3.5.0",
    "chai-string": "npm:chai-string@1.1.6",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "clean-css": "npm:clean-css@3.4.9",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "core-js": "npm:core-js@2.0.3",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "mocha": "npm:mocha@2.4.5",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.2",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "sinon": "npm:sinon@1.17.3",
    "sinon-chai": "npm:sinon-chai@2.8.0",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha"
  },

  packages: {
    "@ignavia/util": {
      "main": "util.js",
      "format": "esm",
      "defaultExtension": "js",
      "meta": {
        "*.js": {
          "babelOptions": {
            "presets": [
              "babel-preset-stage-0"
            ]
          }
        }
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.4.0"
      }
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.1.0"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:asn1.js@4.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:babel-code-frame@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "chalk": "npm:chalk@1.1.1",
        "esutils": "npm:esutils@2.0.2",
        "js-tokens": "npm:js-tokens@1.0.2",
        "line-numbers": "npm:line-numbers@0.2.0",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:babel-helper-bindify-decorators@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-traverse": "npm:babel-traverse@6.4.5",
        "babel-types": "npm:babel-types@6.4.5"
      }
    },
    "npm:babel-helper-builder-binary-assignment-operator-visitor@6.3.13": {
      "map": {
        "babel-helper-explode-assignable-expression": "npm:babel-helper-explode-assignable-expression@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-types": "npm:babel-types@6.4.5"
      }
    },
    "npm:babel-helper-define-map@6.4.5": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.4.0",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-types": "npm:babel-types@6.4.5",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-helper-explode-assignable-expression@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-traverse": "npm:babel-traverse@6.4.5",
        "babel-types": "npm:babel-types@6.4.5"
      }
    },
    "npm:babel-helper-explode-class@6.3.13": {
      "map": {
        "babel-helper-bindify-decorators": "npm:babel-helper-bindify-decorators@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-traverse": "npm:babel-traverse@6.4.5",
        "babel-types": "npm:babel-types@6.4.5"
      }
    },
    "npm:babel-helper-function-name@6.4.0": {
      "map": {
        "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-template": "npm:babel-template@6.3.13",
        "babel-traverse": "npm:babel-traverse@6.4.5",
        "babel-types": "npm:babel-types@6.4.5"
      }
    },
    "npm:babel-helper-get-function-arity@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-types": "npm:babel-types@6.4.5"
      }
    },
    "npm:babel-helper-remap-async-to-generator@6.4.6": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.4.0",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-template": "npm:babel-template@6.3.13",
        "babel-traverse": "npm:babel-traverse@6.4.5",
        "babel-types": "npm:babel-types@6.4.5"
      }
    },
    "npm:babel-messages@6.3.18": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-async-functions@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-class-constructor-call@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-class-properties@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-decorators@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-do-expressions@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-exponentiation-operator@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-export-extensions@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-function-bind@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-object-rest-spread@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-syntax-trailing-function-commas@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-transform-async-to-generator@6.4.6": {
      "map": {
        "babel-helper-remap-async-to-generator": "npm:babel-helper-remap-async-to-generator@6.4.6",
        "babel-plugin-syntax-async-functions": "npm:babel-plugin-syntax-async-functions@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-transform-class-constructor-call@6.4.0": {
      "map": {
        "babel-plugin-syntax-class-constructor-call": "npm:babel-plugin-syntax-class-constructor-call@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-template": "npm:babel-template@6.3.13"
      }
    },
    "npm:babel-plugin-transform-class-properties@6.4.0": {
      "map": {
        "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-transform-decorators@6.4.0": {
      "map": {
        "babel-helper-define-map": "npm:babel-helper-define-map@6.4.5",
        "babel-helper-explode-class": "npm:babel-helper-explode-class@6.3.13",
        "babel-plugin-syntax-decorators": "npm:babel-plugin-syntax-decorators@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-template": "npm:babel-template@6.3.13",
        "babel-types": "npm:babel-types@6.4.5"
      }
    },
    "npm:babel-plugin-transform-do-expressions@6.3.13": {
      "map": {
        "babel-plugin-syntax-do-expressions": "npm:babel-plugin-syntax-do-expressions@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-transform-exponentiation-operator@6.3.13": {
      "map": {
        "babel-helper-builder-binary-assignment-operator-visitor": "npm:babel-helper-builder-binary-assignment-operator-visitor@6.3.13",
        "babel-plugin-syntax-exponentiation-operator": "npm:babel-plugin-syntax-exponentiation-operator@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-transform-export-extensions@6.4.0": {
      "map": {
        "babel-plugin-syntax-export-extensions": "npm:babel-plugin-syntax-export-extensions@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-transform-function-bind@6.3.13": {
      "map": {
        "babel-plugin-syntax-function-bind": "npm:babel-plugin-syntax-function-bind@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-plugin-transform-object-rest-spread@6.3.13": {
      "map": {
        "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.3.13",
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:babel-preset-stage-0@6.3.13": {
      "map": {
        "babel-plugin-transform-do-expressions": "npm:babel-plugin-transform-do-expressions@6.3.13",
        "babel-plugin-transform-function-bind": "npm:babel-plugin-transform-function-bind@6.3.13",
        "babel-preset-stage-1": "npm:babel-preset-stage-1@6.3.13"
      }
    },
    "npm:babel-preset-stage-1@6.3.13": {
      "map": {
        "babel-plugin-transform-class-constructor-call": "npm:babel-plugin-transform-class-constructor-call@6.4.0",
        "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.4.0",
        "babel-plugin-transform-decorators": "npm:babel-plugin-transform-decorators@6.4.0",
        "babel-plugin-transform-export-extensions": "npm:babel-plugin-transform-export-extensions@6.4.0",
        "babel-preset-stage-2": "npm:babel-preset-stage-2@6.3.13"
      }
    },
    "npm:babel-preset-stage-2@6.3.13": {
      "map": {
        "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.3.13",
        "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.3.13",
        "babel-preset-stage-3": "npm:babel-preset-stage-3@6.3.13"
      }
    },
    "npm:babel-preset-stage-3@6.3.13": {
      "map": {
        "babel-plugin-transform-async-to-generator": "npm:babel-plugin-transform-async-to-generator@6.4.6",
        "babel-plugin-transform-exponentiation-operator": "npm:babel-plugin-transform-exponentiation-operator@6.3.13"
      }
    },
    "npm:babel-template@6.3.13": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-traverse": "npm:babel-traverse@6.4.5",
        "babel-types": "npm:babel-types@6.4.5",
        "babylon": "npm:babylon@6.4.5",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-traverse@6.4.5": {
      "map": {
        "babel-code-frame": "npm:babel-code-frame@6.3.13",
        "babel-messages": "npm:babel-messages@6.3.18",
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-types": "npm:babel-types@6.4.5",
        "babylon": "npm:babylon@6.4.5",
        "debug": "npm:debug@2.2.0",
        "globals": "npm:globals@8.18.0",
        "invariant": "npm:invariant@2.2.0",
        "lodash": "npm:lodash@3.10.1",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:babel-types@6.4.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35",
        "babel-traverse": "npm:babel-traverse@6.4.5",
        "esutils": "npm:esutils@2.0.2",
        "lodash": "npm:lodash@3.10.1",
        "to-fast-properties": "npm:to-fast-properties@1.0.1"
      }
    },
    "npm:babylon@6.4.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.35"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.2",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-rsa@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "randombytes": "npm:randombytes@2.0.2"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "elliptic": "npm:elliptic@6.2.3",
        "inherits": "npm:inherits@2.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:buffer@4.4.0": {
      "map": {
        "base64-js": "npm:base64-js@1.0.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:chai@3.5.0": {
      "map": {
        "assertion-error": "npm:assertion-error@1.0.1",
        "deep-eql": "npm:deep-eql@0.1.3",
        "type-detect": "npm:type-detect@1.0.0"
      }
    },
    "npm:chalk@1.1.1": {
      "map": {
        "ansi-styles": "npm:ansi-styles@2.1.0",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.4",
        "has-ansi": "npm:has-ansi@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.0",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:clean-css@3.4.9": {
      "map": {
        "commander": "npm:commander@2.8.1",
        "source-map": "npm:source-map@0.4.4"
      }
    },
    "npm:commander@2.8.1": {
      "map": {
        "graceful-readlink": "npm:graceful-readlink@1.0.1"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "elliptic": "npm:elliptic@6.2.3"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.4"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "inherits": "npm:inherits@2.0.1",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.2"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:deep-eql@0.1.3": {
      "map": {
        "type-detect": "npm:type-detect@0.1.1"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.2"
      }
    },
    "npm:elliptic@6.2.3": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "brorand": "npm:brorand@1.0.5",
        "hash.js": "npm:hash.js@1.0.3",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:formatio@1.1.1": {
      "map": {
        "samsam": "npm:samsam@1.1.2"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:invariant@2.2.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.1.0"
      }
    },
    "npm:is-finite@1.0.1": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.0"
      }
    },
    "npm:line-numbers@0.2.0": {
      "map": {
        "left-pad": "npm:left-pad@0.0.3"
      }
    },
    "npm:loose-envify@1.1.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.2"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:mocha@2.4.5": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.20"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "asn1.js": "npm:asn1.js@4.4.0",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4"
      }
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.10.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.2"
      }
    },
    "npm:readable-stream@2.0.5": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@0.0.1",
        "process-nextick-args": "npm:process-nextick-args@1.0.6",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:repeating@1.1.3": {
      "map": {
        "is-finite": "npm:is-finite@1.0.1"
      }
    },
    "npm:sha.js@2.4.4": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:sinon@1.17.3": {
      "map": {
        "formatio": "npm:formatio@1.1.1",
        "lolex": "npm:lolex@1.3.2",
        "samsam": "npm:samsam@1.1.2",
        "util": "npm:util@0.10.3"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.0.5"
      }
    },
    "npm:stream-http@2.1.0": {
      "map": {
        "builtin-status-codes": "npm:builtin-status-codes@1.0.0",
        "inherits": "npm:inherits@2.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:strip-ansi@3.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:util@0.10.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    }
  }
});
