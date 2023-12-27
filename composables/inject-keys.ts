import type { InjectionKey, Ref } from 'vue'

export type NotificationType = `success` | `error`

export interface Notification {
  id: string
  message: string
  type: NotificationType
}

export interface NotificationProvider {
  notifications: Ref<Notification[]>
  addNotification: (message: string, type: NotificationType) => void
  removeNotification: (id: string) => void
}

export const notificationKey = Symbol(`notificationKey`) as InjectionKey<NotificationProvider>
