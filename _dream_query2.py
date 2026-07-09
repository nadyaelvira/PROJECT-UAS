import sqlite3, json

DB = "C:/Users/ASUS/.local/share/mimocode/mimocode.db"
conn = sqlite3.connect(DB)
c = conn.cursor()

# Get user messages from the "Sidebar untuk pengguna lansia" session
print("=== SIDEBAR SESSION (ses_0b9ed99f6ffeYLUkvi5XJKVFTr) - USER MESSAGES ===")
c.execute("""
    SELECT m.id, m.agent_id, m.time_created, json_extract(m.data, '$.role') as role, 
           substr(m.data, 1, 2000) as preview
    FROM message m
    WHERE m.session_id = 'ses_0b9ed99f6ffeYLUkvi5XJKVFTr'
    ORDER BY m.time_created
""")
for r in c.fetchall():
    mid, agent_id, ts, role, preview = r
    if role == 'user':
        # Extract text content from data
        try:
            d = json.loads(preview)
            content = d.get('content', '')
            if isinstance(content, list):
                texts = [c.get('text', '') for c in content if c.get('type') == 'text']
                content = ' '.join(texts)
            print(f"\n--- User [{ts}] agent={agent_id} ---")
            print(content[:1000])
        except:
            print(f"\n--- User [{ts}] agent={agent_id} ---")
            print(preview[:1000])

print()
print("=== SIDEBAR SESSION - ASSISTANT MESSAGES (first 300 chars each) ===")
c.execute("""
    SELECT m.id, m.agent_id, m.time_created, json_extract(m.data, '$.role') as role,
           substr(m.data, 1, 300) as preview
    FROM message m
    WHERE m.session_id = 'ses_0b9ed99f6ffeYLUkvi5XJKVFTr'
      AND json_extract(m.data, '$.role') = 'assistant'
    ORDER BY m.time_created
""")
for r in c.fetchall():
    mid, agent_id, ts, role, preview = r
    print(f"\n--- Assistant [{ts}] agent={agent_id} ---")
    print(preview[:300])

conn.close()
