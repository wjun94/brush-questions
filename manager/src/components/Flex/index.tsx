import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import './index.less';

export type P = {
  children?: ReactNode;
  // 对齐内容
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  // 对齐项目
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  // Flex Direction
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
};

/** 二次封装flex布局 */
const Flex = ({
  align = 'start',
  justify = 'start',
  direction = 'row',
  wrap = 'wrap',
  children,
  className,
  ...props
}: P & HTMLAttributes<any>) => {
  const prefixCls = 'mall-flex';
  const classes = clsx(
    prefixCls,
    {
      [`${prefixCls}-${direction}`]: direction,
      [`${prefixCls}-${wrap}`]: wrap,
      [`${prefixCls}-justify-${justify}`]: justify,
      [`${prefixCls}-align-${align}`]: align,
    },
    className
  );
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Flex;
