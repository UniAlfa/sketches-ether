import React from "react";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Table from "@material-ui/core/Table/Table";
import Paper from "@material-ui/core/Paper/Paper";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {shconfig} from '../../../config'
import AuthProcess from '../../shared/auth/AuthProcess';
import {AccountRow} from './AccountRow_D'
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import SearchListToolbar from "./SearchListToolbar";

const Auth = new AuthProcess();

export class AccountList extends React.Component<> {

    constructor(props, context) {
        super(props, context);

        this.reloadAccountsState = this.reloadAccountsState.bind(this);
        this.filterArray= this.filterArray.bind(this);
        this.handleReview= this.handleReview.bind(this);
        this.state = {data: [], processing:false, order: 'asc', orderBy: 'username', page: 0, rowsPerPage: 10, seacrhQ: ''};
    }

    componentWillReceiveProps  (nextProps){
        if (this.props.lastUpdate != nextProps.lastUpdate)
            this.reloadAccountsState().then(accounts => this.setState({data: accounts, processing:false}));
    }

    reloadAccountsState(): Promise {
        let _that = this;
        return new Promise(function (resolve, reject) {
            _that.setState({processing:true});
            Auth.fetch(shconfig.mongo_api_accounts_crud_url, {crossDomain:true})
                .then(response =>
                    {
                        return response.json();}
                )
                .then(accounts => {
                    return resolve(accounts);
                })
                .catch(reason => {
                    console.log(reason);
                    _that.setState({processing:false});
                    reject(reason);
                });
        });
    }

    componentDidMount(){
        this.reloadAccountsState().then(accounts => this.setState({data: accounts, processing:false}));
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    filterArray = (array, q, mode) => {
        if (!q || q.length <1)
            return array;

        return array.filter(function (n) {
            let ql = q.toLowerCase();
            return n.username.toLowerCase().indexOf(ql) > -1 || n.address.toLowerCase().indexOf(ql) > -1  || n.balance.toLowerCase().indexOf(ql) > -1
                || (mode === 'admin' && n.created.toLowerCase().indexOf(ql) > -1);
        });
    }

    stableSort = (array, cmp) => {

        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    getSorting = (order, orderBy) => {
        return order === 'desc' ? (a, b) => this.descSort(a, b, orderBy) : (a, b) => -this.descSort(a, b, orderBy);
    }

    descSort = (a, b, orderBy) => {

        let _a = !isNaN(a[orderBy]) ? Number(a[orderBy]): a[orderBy];
        let _b = !isNaN(b[orderBy]) ? Number(b[orderBy]): b[orderBy];

        if (_b < _a) {
            return -1;
        }
        if (_b > _a) {
            return 1;
        }
        return 0;
    };

    handleSearch = (e) => {
        this.setState({searchQ : e.target.value});
    };

    handleReview = (account) => {
        this.props.handleReview(account);
    };

    render() {

        let _cols = this.props.mode === 'admin' ?
        [
            { id: 'username', numeric: false, disablePadding: false, label: 'Номер телефона' },
            { id: 'address', numeric: false, disablePadding: false, label: 'Адрес кошелька' },
            { id: 'balance', numeric: true, disablePadding: false, label: 'Текущий баланс' },
            { id: 'created', numeric: false, disablePadding: false, label: 'Создан' },
            { id: 'action', numeric: false, disablePadding: false, label: 'Action' }
        ]
            : [
            { id: 'username', numeric: false, disablePadding: false, label: 'Номер телефона' },
            { id: 'address', numeric: false, disablePadding: false, label: 'Адрес кошелька' },
            { id: 'balance', numeric: true, disablePadding: false, label: 'Текущий баланс' },
            ];

        return (
            <Paper
                className={'sketch-paper'}
                style={{
                    width: "92%",
                    margin: "auto",
                    marginTop: "1rem",
                    marginBottom: "2rem"
                }}
            >
                {this.state.processing
                    ?
                    <div style={{flexGrow: 1}}>
                        <LinearProgress />
                    </div>
                    : undefined
                }
                <SearchListToolbar handleSearch={this.handleSearch} classes={this.props.classes}/>

                <div style={{overflowX: "auto"}}>
                <Table className={'sketch-table'} aria-labelledby="tableTitle">
                    <SortableTableHead
                        //numSelected={selected.length}
                        cols={_cols}
                        order={this.state.order}
                        orderBy={this.state.orderBy}
                        //onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={this.state.data.length}
                    />

                    <TableBody>
                        {this.stableSort(this.filterArray(this.state.data, this.state.searchQ, this.props.mode), this.getSorting(this.state.order, this.state.orderBy))
                            .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                            .map(n => {
                                let _hasaction = Auth.cani('approve', n);
                                return (
                                    <AccountRow key={n._id['$oid']} {...n} mode={this.props.mode} hasaction={_hasaction} handleReview={this.handleReview}/>
                                );
                            })}


                    </TableBody>
                </Table>
                </div>
                <TablePagination
                    style={{"backgroundColor":"#ececec"}}
                    component="div"
                    count={this.state.data.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    backIconButtonProps={{
                        'aria-label': 'Предыдущая',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Следующая',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>

        );
    }
}

export default AccountList;




class SortableTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow className={'sketch-row'} style={{ backgroundColor: "aliceblue" }}>
                    {this.props.cols.map(col => {
                        return (
                            <TableCell
                                key={col.id}
                                numeric={col.numeric}
                                padding={col.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === col.id ? order : false}
                            >
                                <Tooltip
                                    title="Сортировка"
                                    placement={col.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === col.id}
                                        direction={order}
                                        onClick={this.createSortHandler(col.id)}
                                    >
                                        {col.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}