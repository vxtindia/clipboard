import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import Styles from './Dashboard.less'; // eslint-disable-line no-unused-vars
import withStyles from '../../decorators/withStyles'; // eslint-disable-line no-unused-vars
import Row from '../Row';
import UploadBox from '../UploadBox';
import Clips from '../Clips';
import Loader from '../Loader';
import ClipsStore from '../../stores/ClipStore';
import DashBoardActions from '../../actions/DashBoardActions';

@withStyles(Styles)
class Dashboard extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.getStateFromStore();
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  getStateFromStore() {
    return {
      clips: ClipsStore.clips,
      loading: ClipsStore.clips && ClipsStore.clips.length > 0 ? false : true
    };
  }

  componentDidMount() {
    ClipsStore.addChangeListener(this.onStoreChange);
    DashBoardActions.getClips();
  }

  componentWillUnmount() {
    ClipsStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange() {
    this.setState(this.getStateFromStore());
  }

  get FileUploadForm() {
    return (
      <div className="col-lg-3 col-xs-12 col-md-4 col-sm-6 item-row">
       <UploadBox />
      </div>
    );
  }

  get MemoryInfo() {
    return (
      <span className="lead">410.69gb</span>
    );
  }

  render() {
    return (
      <Row>
        {this.FileUploadForm}
        <Loader loading={this.state.loading} />
        <Clips clips={this.state.clips} />
      </Row>
    );
  }
}

export default Dashboard;