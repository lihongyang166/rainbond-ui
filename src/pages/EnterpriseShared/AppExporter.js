import React, { PureComponent } from 'react';
import { Modal, Alert, Button, notification, Select, Spin, Icon } from 'antd';

import globalUtil from '../../utils/global';
import { connect } from 'dva';
import styles from '../../components/CreateTeam/index.less';

import DescriptionList from '../../components/DescriptionList';

const Option = Select.Option;
const { Description } = DescriptionList;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

@connect(({ user }) => ({
  user: user.currentUser,
}))
export default class AppExporter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      app_exporte_status: null,
      exportVersionList: (props.app && props.app.versions_info) || [],
      exportVersion: (props.app && [props.app.versions_info[0].version]) || '',
    };
  }
  componentDidMount() {
    this.queryExport();
  }
  handleCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };
  handleExporter = format => {
    const { app, eid } = this.props;
    const { exportVersion } = this.state;
    this.props.dispatch({
      type: 'market/appExport',
      payload: {
        app_id: app.app_id,
        enterprise_id: eid,
        app_versions: exportVersion,
        format,
      },
      callback: data => {
        if (data && data.bean) {
          notification.success({ message: '操作成功，开始导出，请稍等！' });
          this.queryExport();
        }
      },
    });
  };
  queryExport = () => {
    const { app, eid } = this.props;

    let group_version = this.state.exportVersion;
    group_version = group_version.join();
    this.props.dispatch({
      type: 'market/queryExport',
      payload: {
        enterprise_id: eid,
        body: {
          app_id: app.app_id,
          app_version: group_version,
        },
      },
      callback: data => {
        if (data) {
          if (
            (data.list &&
              data.list.length > 0 &&
              data.list[0].rainbond_app &&
              data.list[0].rainbond_app.status == 'exporting') ||
            (data.list &&
              data.list.length > 0 &&
              data.list[0].docker_compose &&
              data.list[0].docker_compose.status == 'exporting')
          ) {
            this.props.setIsExporting(true);
            setTimeout(() => {
              this.queryExport();
            }, 5000);
          }

          if (
            (data.list &&
              data.list.length > 0 &&
              data.list[0].rainbond_app &&
              data.list[0].rainbond_app.status != 'exporting') ||
            (data.list &&
              data.list.length > 0 &&
              data.list[0].docker_compose &&
              data.list[0].docker_compose.status != 'exporting')
          ) {
            this.props.setIsExporting(false);
          }
          this.setState({
            app_exporte_status:
              data.list && data.list.length > 0 && data.list[0],
          });
        }
      },
    });
  };
  download = downloadPath => {
    let aEle = document.querySelector('#down-a-element');
    if (!aEle) {
      aEle = document.createElement('a');
      aEle.setAttribute('download', 'filename');
      document.body.appendChild(aEle);
    }
    aEle.href = downloadPath;
    if (document.all) {
      aEle.click();
    } else {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      aEle.dispatchEvent(e);
    }
  };
  getStatus = status => {
    if (!status.is_export_before) {
      return '未导出';
    }
    if (status.status == 'success') {
      return '成功';
    }
    if (status.status == 'failed') {
      return '失败';
    }
    if (status.status == 'exporting') {
      return '进行中';
    }
  };
  getAction = (app_status, type) => {
    if (!app_status.is_export_before) {
      return (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            this.handleExporter(type);
          }}
        >
          导出
        </Button>
      );
    }

    if (app_status.status == 'success') {
      return (
        <div>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              this.download(app_status.file_path);
            }}
          >
            下载
          </Button>
          <Button
            style={{ marginLeft: 16 }}
            onClick={() => {
              this.handleExporter(type);
            }}
          >
            重新导出
          </Button>
        </div>
      );
    }
    if (app_status.status == 'exporting') {
      return (
        <div>
          <Button
            disabled
            type="primary"
            size="small"
            onClick={() => {
              this.download(downloadPath);
            }}
          >
            下载
          </Button>
          <Button
            disabled
            style={{ marginLeft: 16 }}
            size="small"
            onClick={() => {
              this.handleExporter(type);
            }}
          >
            重新导出
          </Button>
        </div>
      );
    }
    if (app_status.status == 'failed') {
      return (
        <div>
          <Button
            disabled
            type="primary"
            size="small"
            onClick={() => {
              this.download(downloadPath);
            }}
          >
            下载
          </Button>
          <Button
            style={{ marginLeft: 16 }}
            size="small"
            onClick={() => {
              this.handleExporter(type);
            }}
          >
            重新导出
          </Button>
        </div>
      );
    }
  };
  getRainbondAppShow = () => {
    if (
      !this.state.app_exporte_status ||
      !this.state.app_exporte_status.rainbond_app
    ) {
      return;
    }
    const rainbond_app_status = this.state.app_exporte_status.rainbond_app;
    return (
      <DescriptionList
        size="large"
        title="RainbondApp规范(Rainbond平台可用)"
        style={{ marginBottom: 32 }}
      >
        <Description term="导出状态">
          {this.getStatus(rainbond_app_status)}
        </Description>
        {this.getAction(rainbond_app_status, 'rainbond-app')}
      </DescriptionList>
    );
  };
  getDockerComposeAppShow = () => {
    if (
      !this.state.app_exporte_status ||
      !this.state.app_exporte_status.docker_compose
    ) {
      return;
    }
    const compose_app_status = this.state.app_exporte_status.docker_compose;
    return (
      <DescriptionList
        size="large"
        title="DockerComposeApp规范(DockerCompose环境可用)"
        style={{ marginBottom: 32 }}
      >
        <Description term="导出状态">
          {this.getStatus(compose_app_status)}
        </Description>
        {this.getAction(compose_app_status, 'docker-compose')}
      </DescriptionList>
    );
  };

  handleChange = value => {
    this.setState(
      {
        exportVersion: [value],
      },
      () => {
        this.queryExport();
      }
    );
  };

  render() {
    const { onOk, onCancel, loading } = this.props;
    return (
      <Modal
        title="导出云市应用"
        onOk={onOk}
        visible
        className={styles.TelescopicModal}
        onCancel={onCancel}
        footer={[
          <Button onClick={onCancel}> 取消 </Button>,
          <Button type="primary" loading={loading || false} onClick={onOk}>
            确定
          </Button>,
        ]}
      >
        <Alert
          style={{ textAlign: 'center', marginBottom: 16 }}
          message="导出云市应用适用于交付环境"
          type="success"
        />
        <div style={{ marginBottom: '30px' }}>
          导出版本：
          <Select
            defaultValue={this.state.exportVersion}
            onChange={this.handleChange}
            size="small"
          >
            {this.state.exportVersionList.map((item, index) => {
              return (
                <Option key={index} value={item.version}>
                  {item.version}
                </Option>
              );
            })}
          </Select>
        </div>
        {this.getRainbondAppShow()}
        {!(this.props.app.source == 'market') && this.getDockerComposeAppShow()}
      </Modal>
    );
  }
}
