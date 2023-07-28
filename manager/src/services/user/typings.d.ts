declare namespace USER {
  /** 用户信息 */
  type UserInfo = {
    id: string;
    /** 管理员名称 */
    name: string;
    /** 管理员邮箱 */
    email: string;
    /** 手机号 */
    mobile: string;
    /** 角色 */
    role: number;
  };
  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
  type NoticeIconItemType = 'notification' | 'message' | 'event';
}
