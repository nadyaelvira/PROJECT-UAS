import sqlite3, json, sys

DB = "C:/Users/ASUS/.local/share/mimocode/mimocode.db"
conn = sqlite3.connect(DB)
c = conn.cursor()

# Schema
print("=== SCHEMA ===")
c.execute("SELECT sql FROM sqlite_master WHERE type='table'")
for r in c.fetchall():
    print(r[0])
    print()

# Recent sessions for this project
print("=== RECENT SESSIONS ===")
c.execute("SELECT id, directory, title, time_created FROM session WHERE directory LIKE '%PROJECT-UAS%' ORDER BY time_created DESC LIMIT 15")
for r in c.fetchall():
    print(r)

print()
print("=== PARTS TABLE COLUMNS ===")
c.execute("PRAGMA table_info(part)")
for r in c.fetchall():
    print(r)

conn.close()
