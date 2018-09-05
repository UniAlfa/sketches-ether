import React from "react";
import AccountList from "../shared/list/AccountList_S";
import { InfoCard } from "../shared/bits/InfoCard_D";
import Typography from "@material-ui/core/Typography/Typography";
import { shconfig } from "../../config";
import Grid from "@material-ui/core/Grid/Grid";

export class AccountListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.searchProcess = this.searchProcess.bind(this);
    this.estimateWallets = this.estimateWallets.bind(this);
    this.state = { walCount: undefined };
  }

  searchProcess = () => {};

  componentDidMount() {
    this.estimateWallets().then(c => this.setState({ walCount: c }));
  }

  estimateWallets(): Promise {
    let _that = this;
    return new Promise(function(resolve, reject) {
      _that.setState({ processing: true });
      fetch(shconfig.mongo_api_accounts_crud_url + "&c=true")
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            let error = new Error(response.statusText);
            throw error;
          }
        })
        .then(c => {
          return resolve(c);
        })
        .catch(reason => {
          console.log(reason);
          _that.setState({ processing: false });
          reject(reason);
        });
    });
  }

  render() {
    return (
      <div>
        <div className="cards">
          <Grid container spacing={24} style={{ justifyContent: "center" }}>
            <Grid item xs={8} sm={4}>
              <InfoCard
                count={5000}
                imageUrl={"/images/card-members.jpg"}
                title={"Участников форума"}
                cardStyle={{ backgroundColor: "#f6ebcd" }}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <InfoCard
                count={this.state.walCount}
                imageUrl="images/card-etherium.jpg"
                title={"Кошельков Ethereum"}
                cardStyle={{
                  backgroundColor: "#cbc2d2",
                  backgroundSize: "50%"
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <InfoCard
                count={500}
                imageUrl="/images/card-books.jpg"
                title={"Книг в магазинах Сбербанка"}
                cardStyle={{ backgroundColor: "#a1dce4" }}
              />
            </Grid>
          </Grid>
        </div>
        
        <Typography variant="headline" align="center" style={{"paddingTop": "1rem"}}>
          Список счетов
        </Typography>

        <AccountList mode={"short"} />

      </div>
    );
  }
}
