#!/bin/bash
cd /home/user/gloamdeep
for id in "$@"; do awk -v id="D-$id" 'index($0,"**"id" ")==1{p=1;print;next} p&&/^\*\*D-[0-9]+ /{p=0} p' docs/DECISIONS.md docs/archive/*.md; echo; done
