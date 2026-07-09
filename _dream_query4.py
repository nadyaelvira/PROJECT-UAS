import sqlite3, json

DB = "C:/Users/ASUS/.local/share/mimocode/mimocode.db"
conn = sqlite3.connect(DB)
c = conn.cursor()

# Search for user messages with rule-like keywords
keywords = ["always", "never", "remember", "rule", "decision", "must", "should not", "do not", "jangan", "harus", "selalu"]

for kw in keywords:
    c.execute("""
        SELECT h.part_id, h.session_id, h.body, h.time_created
        FROM history_fts h
        JOIN history_fts_idx fts ON fts.rowid = h.rowid
        WHERE history_fts_idx MATCH ? AND h.kind = 'user'
        LIMIT 3
    """, (kw,))
    results = c.fetchall()
    if results:
        print(f"\n=== KEYWORD: '{kw}' (user messages) ===")
        for part_id, sid, body, ts in results:
            print(f"\n  [session={sid}] time={ts}")
            # Show first 500 chars of body
            print(f"  {body[:500]}")

# Also search for specific patterns in assistant text that indicate design decisions
print("\n\n=== DESIGN DECISION SEARCH ===")
decision_kw = ["architecture", "pattern", "hydration", "sync", "polling"]
for kw in decision_kw:
    c.execute("""
        SELECT h.part_id, h.session_id, substr(h.body, 1, 500), h.time_created
        FROM history_fts h
        JOIN history_fts_idx fts ON fts.rowid = h.rowid
        WHERE history_fts_idx MATCH ? AND h.kind = 'assistant' AND h.tool_name IS NULL
        LIMIT 2
    """, (kw,))
    results = c.fetchall()
    if results:
        print(f"\n--- '{kw}' (assistant text) ---")
        for part_id, sid, body, ts in results:
            print(f"  [session={sid}] {body[:300]}")

conn.close()
