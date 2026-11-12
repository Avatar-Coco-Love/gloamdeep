#!/bin/bash
# print decisions by id: paragraph starting with **D-xxx ·
cd /home/user/gloamdeep
for id in "$@"; do awk -v id="$id" 'BEGIN{RS="";} $0 ~ "^\\*\\*"id" " {print; print ""}' docs/DECISIONS.md docs/archive/DECISIONS*.md | cut -c1-900; done
