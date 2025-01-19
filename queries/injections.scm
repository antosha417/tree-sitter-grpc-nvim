(comment) @comment

(grpc_request (command) @injection.content
              (#set! injection.language "bash")
              (#set! injection.include-children))

(grpc_request (json_object) @injection.content
              (#set! injection.language "json")
              (#set! injection.include-children))

