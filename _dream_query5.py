import sqlite3, json

DB = "C:/Users/ASUS/.local/share/mimocode/mimocode.db"
conn = sqlite3.connect(DB)
c = conn.cursor()

# Get all user parts from the Sidebar session with actual text content
print("=== SIDEBAR SESSION USER PARTS WITH TEXT ===")
c.execute("""
    SELECT p.id, p.message_id, p.time_created, p.data
    FROM part p
    WHERE p.session_id = 'ses_0b9ed99f6ffeYLUkvi5XJKVFTr'
    ORDER BY p.time_created
""")
for row in c.fetchall():
    pid, mid, ts, data = row
    try:
        d = json.loads(data)
        dtype = d.get('type', '')
        if dtype == 'text':
            text = d.get('text', '')
            if text.strip():
                print(f"\n--- Text part [{ts}] msg={mid} ---")
                print(text[:1000])
        elif dtype == 'tool':
            tool = d.get('tool', '')
            state = d.get('state', {})
            if tool in ('Edit', 'Write', 'Read'):
                inp = state.get('input', {})
                out = str(state.get('output', ''))[:200]
                print(f"\n--- Tool [{ts}] {tool} ---")
                if tool == 'Edit':
                    print(f"  File: {inp.get('file_path', '')}")
                    print(f"  Old: {str(inp.get('old_string', ''))[:200]}")
                    print(f"  New: {str(inp.get('new_string', ''))[:200]}")
                elif tool == 'Write':
                    print(f"  File: {inp.get('file_path', '')}")
                    print(f"  Content preview: {str(inp.get('content', ''))[:200]}")
                elif tool == 'Read':
                    print(f"  File: {inp.get('file_path', '')}")
    except:
        pass

# Also check parts from the other sessions for text content
other_sessions = [
    'ses_0bad9b1d4ffeIlOolzK0xtvLNN',
    'ses_0bb05f00bffe3e7H75Oa5le8Na',
    'ses_0bb0789a5ffeWgA1QZ6bQvT6GU',
    'ses_0bb0a09efffe5oQy26nN66uaLK',
    'ses_0bb2417d2ffeXkDKGaVDPHpuQr',
    'ses_0bb313b93ffe9u1P4gx0uG6blO',
    'ses_0bd963ef1ffeXP1iPj6AVhsUzm',
]

for sid in other_sessions:
    c.execute("""
        SELECT p.id, p.message_id, p.time_created, p.data
        FROM part p
        WHERE p.session_id = ?
        ORDER BY p.time_created
    """, (sid,))
    rows = c.fetchall()
    has_text = False
    for row in rows:
        pid, mid, ts, data = row
        try:
            d = json.loads(data)
            dtype = d.get('type', '')
            if dtype == 'text' and d.get('text', '').strip():
                if not has_text:
                    print(f"\n=== SESSION {sid} TEXT PARTS ===")
                    has_text = True
                print(f"\n--- Text [{ts}] msg={mid} ---")
                print(d['text'][:500])
        except:
            pass

conn.close()
