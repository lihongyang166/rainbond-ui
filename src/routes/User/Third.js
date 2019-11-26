import React, { Component } from "react";
import { connect } from "dva";
import { Link, routerRedux } from "dva/router";
import rainbondUtil from "../../utils/rainbond";
import globalUtil from "../../utils/global";
import { notification } from "antd";
import cookie from "../../utils/cookie";

@connect(({ loading, global }) => ({
  rainbondInfo: global.rainbondInfo
}))
export default class ThirdLogin extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let code = rainbondUtil.OauthParameter("code");
    let service_id = rainbondUtil.OauthParameter("service_id");
    const { dispatch } = this.props;
    if (code && service_id) {
      //获取第三方用户信息
      dispatch({
        type: "user/fetchThirdCertification",
        payload: {
          code,
          service_id
        },
        callback: res => {
          if (res && res.status && res.status === 400) {
            notification.warning({ message: "未成功获取access_token" });
            dispatch(routerRedux.push(`/user/login`));
          } else if (res && res._code === 200) {
            const { rainbondInfo } = this.props;
            const data = res.data.bean;
            //有账号 未认证 is_authenticated
            let teamName = globalUtil.getCurrTeamName();
            let regionName = globalUtil.getCurrRegionName();
            let token = cookie.get("token");

            if (token && data) {
              dispatch({
                type: "user/fetchThirdLoginBinding",
                payload: {
                  code,
                  service_id
                },
                callback: resdata => {
                  if (resdata && resdata.status && resdata.status === 400) {
                    message.warning("认证失败，请重新认证", 2, () => {
                      dispatch(
                        routerRedux.push(
                          `/team/${teamName}/region/${regionName}/create/code/${
                            data.result.oauth_type
                          }`
                        )
                      );
                    });
                  } else if (resdata && resdata._code === 200) {
                    message.success("认证成功", 2, () => {
                      dispatch(
                        routerRedux.push(
                          `/team/${teamName}/region/${regionName}/create/code/${
                            data.result.oauth_type
                          }`
                        )
                      );
                    });
                  }
                }
              });
            }

            if (data && data.result) {
              //未绑定
              if (!data.result.is_authenticated) {
                dispatch(
                  routerRedux.push(
                    `/user/third/register?code=${data.result.code}&service_id=${
                      data.result.service_id
                    }&oauth_user_id=${data.result.oauth_user_id}&oauth_type=${
                      data.result.oauth_type
                    }`
                  )
                );
              } else {
                dispatch(
                  routerRedux.push(
                    `/user/third/login?code=${data.result.code}&service_id=${
                      data.result.service_id
                    }&oauth_user_id=${data.result.oauth_user_id}&oauth_type=${
                      data.result.oauth_type
                    }`
                  )
                );
              }
            } else if (data && data.token) {
              cookie.set("token", data.token);
              window.location.reload();
            }

            // if (!res.is_authenticated && !is_link) {
            //   this.props.dispatch(
            //     routerRedux.push(
            //       `/user/third/register?code=${code}&service_id=${service_id}`
            //     )
            //   );
            // }
            // //认证过期
            // else if (!is_expired) {
            //   this.props.dispatch({
            //     type: "user/fetchCertificationThird",
            //     payload: {
            //       code,
            //       service_id
            //     },
            //     callback: res => {
            //       if (res) {
            //         this.props.dispatch(
            //           routerRedux.push(
            //             `/user/third/login?code=${code}&service_id=${service_id}`
            //           )
            //         );
            //       }
            //     }
            //   });
            // } else {
            //   this.props.dispatch(
            //     routerRedux.push(
            //       `/user/third/login?code=${code}&service_id=${service_id}`
            //     )
            //   );
            // }
          }
        }
      });
    }

    // if (code && service_id) {

    // }
  }

  render() {
    return <div />;
  }
}
