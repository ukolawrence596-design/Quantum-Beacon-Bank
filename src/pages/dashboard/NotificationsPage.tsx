import { useState, useEffect } from 'react'
import { Bell, ArrowLeftRight, Shield, CreditCard, Info, Check, Trash2, Landmark } from 'lucide-react'
import { formatRelativeTime } from '../../utils/formatDate'
import { cn }                 from '../../utils/cn'
import { useAuth }            from '../../context/AuthContext'
import { supabase }           from '../../services/api'

const TYPE_CONFIG: Record<string, { color: string; bg: string; icon: typeof Bell }> = {
  transfer: { color: '#ccff00', bg: 'rgba(204,255,0,0.1)',  icon: ArrowLeftRight },
  security: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: Shield        },
  card:     { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: CreditCard    },
  info:     { color: '#ccff00', bg: 'rgba(204,255,0.1)',  icon: Info          },
  loan:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: Landmark      },
  success:  { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  icon: Check         },
  warning:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: Bell          },
  error:    { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  icon: Bell          },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading,       setLoading]       = useState(true)
  const [filter,        setFilter]        = useState<'all' | 'unread'>('all')
  const { user }                          = useAuth()

  useEffect(() => {
    if (!user?.id) return
    loadNotifications()

    // Real-time subscription
    const sub = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event:  'INSERT',
          schema: 'public',
          table:  'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        payload => {
          setNotifications(prev => [payload.new, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(sub) }
  }, [user?.id])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      setNotifications(data || [])
    } catch (err) {
      console.error('Load notifications error:', err)
    } finally {
      setLoading(false)
    }
  }

  const markRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllRead = async () => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user!.id)
      .eq('read', false)
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = async (id: string) => {
    await supabase.from('notifications').delete().eq('id', id)
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const filtered    = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-heading font-black flex items-center gap-3"
            style={{ color: 'var(--text-primary)' }}
          >
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span
                className="text-sm px-2.5 py-1 rounded-full font-bold"
                style={{ background: '#ccff00', color: '#0d0d0d' }}
              >
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Stay updated with your account activity
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(204,255,0,0.1)',
              color:      '#ccff00',
              border:     '1px solid rgba(204,255,0,0.2)',
            }}
          >
            <Check size={12} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter */}
      <div
        className="flex items-center rounded-full p-1 gap-1 w-fit"
        style={{
          background: 'var(--bg-elevated)',
          border:     '1px solid var(--border-primary)',
        }}
      >
        {(['all', 'unread'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200"
            style={{
              background: filter === f ? '#ccff00'          : 'transparent',
              color:      filter === f ? '#0d0d0d'          : 'var(--text-secondary)',
            }}
          >
            {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'var(--bg-elevated)',
          border:     '1px solid var(--border-primary)',
        }}
      >
        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {[1,2,3].map(i => <div key={i} className="h-16 rounded-xl skeleton" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Bell size={48} style={{ color: 'var(--text-muted)' }} />
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {filter === 'unread' ? "You're all caught up!" : 'Notifications will appear here'}
            </p>
          </div>
        ) : (
          filtered.map((notif, index) => {
            const cfg  = TYPE_CONFIG[notif.type] || TYPE_CONFIG.info
            const Icon = cfg.icon
            return (
              <div
                key={notif.id}
                className={cn(
                  'flex items-start gap-4 px-6 py-5 cursor-pointer transition-all duration-200 hover:bg-[var(--bg-hover)]',
                )}
                style={{
                  background: !notif.read ? 'rgba(204,255,0.02)' : 'transparent',
                  borderBottom: index < filtered.length - 1
                    ? '1px solid var(--border-primary)'
                    : 'none',
                }}
                onClick={() => markRead(notif.id)}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: '#ccff00' }}
                      />
                    )}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {notif.message}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {formatRelativeTime(notif.created_at)}
                  </p>
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation()
                    deleteNotification(notif.id)
                  }}
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    color:      '#ef4444',
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}
