import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd/es/auto-complete';
import React, { useRef } from 'react';

import clsx from 'clsx';
import styles from './index.less';
import { useMountMergeState } from '@ant-design/pro-components';

export type HeaderSearchProps = {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options: AutoCompleteProps['options'];
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
};

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    defaultVisible,
    ...restProps
  } = props;

  const inputRef = useRef<any | null>(null);

  const [value, setValue] = useMountMergeState<string | undefined>(
    defaultValue,
    {
      value: props.value,
      onChange: props.onChange,
    }
  );

  const [searchMode, setSearchMode] = useMountMergeState(
    defaultVisible ?? false,
    {
      value: props.visible,
      onChange: onVisibleChange,
    }
  );

  const inputClass = clsx(styles.input, {
    [styles.show]: searchMode,
  });
  return (
    <div
      className={clsx(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);
        if (searchMode && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        value={value}
        options={restProps.options}
        onChange={(e) => setValue(e)}
      >
        <Input
          size="small"
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
