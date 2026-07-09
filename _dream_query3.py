import sqlite3, json

DB = "C:/Users/ASUS/.local/share/mimocode/mimocode.db"
conn = sqlite3.connect(DB)
c = conn.cursor()

# Get user messages from other recent sessions
sessions = [
    ('ses_0bad9b1d4ffeIlOolzK0xtvLNN', 'New session 04:32'),
    ('ses_0bb05f00bffe3e7H75Oa5le8Na', 'New session 03:44'),
    ('ses_0bb0789a5ffeWgA1QZ6bQvT6GU', 'New session 03:42'),
    ('ses_0bb0a09efffe5oQy26nN66uaLK', 'New session 03:39'),
    ('ses_0bb2417d2ffeXkDKGaVDPHpuQr', 'New session 03:11'),
    ('ses_0bb313b93ffe9u1P4gx0uG6blO', 'New session 02:57'),
    ('ses_0bd963ef1ffeXP1iPj6AVhsUzm', 'New session Jul-08'),
]

for sid, label in sessions:
    print(f"\n=== {label} ({sid}) - USER MESSAGES ===")
    c.execute("""
        SELECT m.id, m.agent_id, m.time_created, json_extract(m.data, '$.role') as role,
               substr(m.data, 1, 2000) as preview
        FROM message m
        WHERE m.session_id = ?
        ORDER BY m.time_created
    """, (sid,))
    for r in c.fetchall():
        mid, agent_id, ts, role, preview = r
        if role == 'user':
            try:
                d = json.loads(preview)
                content = d.get('content', '')
                if isinstance(content, list):
                    texts = [x.get('text', '') for x in content if x.get('type') == 'text']
                    content = ' '.join(texts)
                if content.strip():
                    print(f"\n--- User [{ts}] agent={agent_id} ---")
                    print(content[:800])
            except:
                pass

conn.close()
