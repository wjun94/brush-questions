declare namespace TAG {
  /** 分类列表item */
  type Item = {
    id: string;
    /** 标题 */
    title: string;
    /** 描述 */
    answer?: string
  };
  type Create = {
    /** 标题 */
    title: string;
    /** 描述 */
    answer?: string
  }
}
