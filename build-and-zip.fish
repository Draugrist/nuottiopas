#!/usr/bin/env fish

# Build the project and package only dist contents into a zip archive.
set zip_file nuottiopas.zip
if test (count $argv) -ge 1
    set zip_file $argv[1]
end

npm run build
if test $status -ne 0
    exit $status
end

if not test -d dist
    echo "Error: dist folder was not created."
    exit 1
end

if test -f "$zip_file"
    rm -f "$zip_file"
    if test $status -ne 0
        exit $status
    end
end

cd dist
if test $status -ne 0
    exit $status
end

zip -r "../$zip_file" . -x "*.DS_Store"
if test $status -ne 0
    exit $status
end

cd - >/dev/null

echo "Created $zip_file with contents of dist/."
