import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Tab from './Tab';
import Icon from '../icon';
import TabsProps from './PropsType';

class Tabs extends Component<TabsProps, any> {
  static Tab: typeof Tab;

  private tabHeaderWrap;

  private tabHeaderNav;

  private activeTab;

  static defaultProps = {
    value: 0,
    defaultValue: 0,
    prefixCls: 'zw-tabs',
    type: 'card',
    direction: 'horizontal',
    size: 'md',
    onChange: () => {},
    onTabClose: () => {},
    animated: true,
  };

  static getSelectIndex(children) {
    let selectIndex;
    React.Children.forEach(children, (item, $index) => {
      if ((item as ReactElement<any>).props && (item as ReactElement<any>).props.selected) {
        selectIndex = $index;
      }
    });
    return selectIndex;
  }

  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value
        || props.defaultValue
        || Tabs.getSelectIndex(props.children)
        || 0,
      lineWidth: 0,
      lineOffsetLeft: 0,
      scrollOffset: 0,
      headerWidth: 0,
      headerHeight: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      isArrowShown: false,
    };
    this.tabHeaderWrap = React.createRef();
    this.tabHeaderNav = React.createRef();
  }

  componentDidMount() {
    this.getHeaderStyle();
    this.setActiveLineStyle();
  }

  componentDidUpdate(prevProps) {
    const { size: prevSize } = prevProps;
    const { size: currentSize } = this.props;
    if (prevSize !== currentSize) {
      this.setActiveLineStyle();
    }
  }

  getHeaderStyle() {
    const { width: headerWidth, height: headerHeight } = this.tabHeaderWrap.current.getBoundingClientRect();
    const { width: scrollWidth, height: scrollHeight } = this.tabHeaderNav.current.getBoundingClientRect();
    const { direction } = this.props;
    const isArrowShown = (direction === 'horizontal' && scrollWidth > headerWidth) || (direction === 'vertical' && scrollHeight > headerHeight);
    this.setState({
      headerWidth: direction === 'horizontal' && isArrowShown && headerWidth - 40,
      headerHeight: direction === 'vertical' && isArrowShown && headerHeight - 40,
      scrollWidth,
      scrollHeight,
      isArrowShown,
    });
  }

  setActiveLineStyle() {
    const { offsetLeft = 0 } = this.activeTab || {};
    const { width = 0 } = this.activeTab && this.activeTab.getBoundingClientRect();
    this.setState({
      lineWidth: width,
      lineOffsetLeft: offsetLeft,
    });
  }

  handleTabClick = (e, index, disabled) => {
    const { onChange, direction } = this.props;
    const { scrollOffset, headerWidth, headerHeight, isArrowShown } = this.state;
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = e.target;
    const getScrollOffset = () => {
      if (direction === 'horizontal') {
        const diff = scrollOffset + headerWidth < offsetLeft + clientWidth ? offsetLeft + clientWidth - headerWidth : scrollOffset;
        return scrollOffset > offsetLeft ? offsetLeft : diff;
      }
      const diff = scrollOffset + headerHeight < offsetTop + clientHeight ? offsetTop + clientHeight - headerHeight : scrollOffset;
      return scrollOffset > offsetTop ? offsetTop : diff;
    };
    if (!disabled) {
      this.setState({
        value: index,
        scrollOffset: isArrowShown ? getScrollOffset() : scrollOffset,
      }, () => {
        this.setActiveLineStyle();
        onChange(index);
      });
    }
  };

  handleTabClose = (e, index, disabled) => {
    e.stopPropagation();
    const { onTabClose } = this.props;
    if (!disabled) {
      onTabClose(index);
    }
  };

  scrollRightOrBottom = () => {
    const { direction } = this.props;
    const { headerWidth, headerHeight, scrollWidth, scrollHeight, scrollOffset } = this.state;
    if (direction === 'horizontal') {
      const offset = scrollWidth - scrollOffset - headerWidth;
      this.setState({
        scrollOffset: scrollOffset + ((offset > headerWidth) ? headerWidth : offset),
      });
    } else {
      const offset = scrollHeight - scrollOffset - headerHeight;
      this.setState({
        scrollOffset: scrollOffset + ((offset > headerHeight) ? headerHeight : offset),
      });
    }
  };

  scrollLeftOrTop = () => {
    const { direction } = this.props;
    const { headerWidth, headerHeight, scrollOffset } = this.state;
    if (direction === 'horizontal') {
      this.setState({
        scrollOffset: scrollOffset - ((scrollOffset > headerWidth) ? headerWidth : scrollOffset),
      });
    } else {
      this.setState({
        scrollOffset: scrollOffset - ((scrollOffset > headerHeight) ? headerHeight : scrollOffset),
      });
    }
  };

  render() {
    const {
      className, children, style, prefixCls, type, direction, size, animated,
    } = this.props;
    const { value, lineWidth, lineOffsetLeft, isArrowShown, scrollOffset } = this.state;

    const arrowL = direction === 'horizontal' ? 'left' : 'top';
    const arrowR = direction === 'horizontal' ? 'right' : 'bottom';
    const animateStyle = direction === 'horizontal' ? { marginLeft: `-${value * 100}%` } : {};
    const headerNavStyle = direction === 'horizontal' ? { transform: `translate3d(${-scrollOffset}px,0,0)` } : { transform: `translate3d(0,${-scrollOffset}px,0)` };

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${direction}`]: direction,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--${type}`]: direction === 'horizontal' && type,
    });
    const headerCls = classnames(`${prefixCls}__header`, {
      [`${prefixCls}__header--padding`]: isArrowShown,
    });
    const navCls = classnames(`${prefixCls}__header__nav`, {
      [`${prefixCls}__header__nav--animated`]: animated,
    });
    const lineCls = classnames(`${prefixCls}__header__line`, {
      [`${prefixCls}__header__line--animated`]: animated,
    });
    const bodyCls = classnames(`${prefixCls}__body`, {
      [`${prefixCls}__body--animated`]: animated,
    });
    const arrowLCls = classnames(`${prefixCls}__header__arrow`, {
      [`${prefixCls}__header__arrow--${arrowL}`]: arrowL,
    });
    const arrowRCls = classnames(`${prefixCls}__header__arrow`, {
      [`${prefixCls}__header__arrow--${arrowR}`]: arrowR,
    });

    const items = React.Children.map(children, (item: React.ReactElement<any>, $index) => {
      const tabItemCls = classnames(`${prefixCls}__header__item`, {
        [`${prefixCls}__header__item--disabled`]: !!item.props.disabled,
        [`${prefixCls}__header__item--active`]: $index === value,
      });
      const bindActiveRef = $index === value ? { ref: (node) => { this.activeTab = node; } } : {};

      return (
        <div
          key={$index.toString()}
          className={tabItemCls}
          {...bindActiveRef}
          onClick={(e) => { this.handleTabClick(e, $index, item.props.disabled); }}
        >
          {item.props.title}
          {direction === 'horizontal' && item.props.closable && <Icon type="wrong" onClick={(e) => { this.handleTabClose(e, $index, item.props.disabled); }} />}
        </div>
      );
    });

    const content = React.Children.map(children, (item, $index) => {
      return (
        <Tab {...(item as ReactElement<any>).props} selected={value === $index}>
          {(item as ReactElement<any>).props.children}
        </Tab>
      );
    });

    return (
      <div className={cls} style={style}>
        <div className={headerCls}>
          <div className={`${prefixCls}__header__scroll`} ref={this.tabHeaderWrap}>
            <div className={navCls} ref={this.tabHeaderNav} style={isArrowShown ? headerNavStyle : {}}>
              <div>{items}</div>
              {
                type === 'line' && (
                  <div
                    className={lineCls}
                    style={{
                      width: lineWidth,
                      transform: `translate3d(${lineOffsetLeft}px,0,0)`,
                    }}
                  />
                )
              }
            </div>
          </div>
          {
            isArrowShown && (
              <>
                <span className={arrowLCls} onClick={() => this.scrollLeftOrTop()}>
                  <Icon type={`arrow-${arrowL}`} />
                </span>
                <span className={arrowRCls} onClick={() => this.scrollRightOrBottom()}>
                  <Icon type={`arrow-${arrowR}`} />
                </span>
              </>
            )
          }
        </div>
        <div className={bodyCls} style={animateStyle}>{content}</div>
      </div>
    );
  }
}

export default Tabs;
