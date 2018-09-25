import React from "react";
import AccountList from "../shared/list/AccountList_S";
import { InfoCard } from "../shared/bits/InfoCard_D";
import Typography from "@material-ui/core/Typography/Typography";
import { shconfig } from "../../config";
import Grid from "@material-ui/core/Grid/Grid";
import Auth from "../shared/auth/AuthProcess";
import "react-id-swiper/src/styles/css/swiper.css";
// import SwiperCard from "../shared/swiper";
import Swiper from "react-id-swiper";

const params = {
  slidesPerView: 3,
  spaceBetween: 40,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    599: {
      slidesPerView: 1,
      spaceBetween: 10
    }
  }
};

export class AccountListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.searchProcess = this.searchProcess.bind(this);
    this.estimateWallets = this.estimateWallets.bind(this);
    this.listRenewed = this.listRenewed.bind(this);
    this.state = { walCount: undefined };
  }

  searchProcess = () => {};

  componentDidMount() {
    //this.estimateWallets().then(c => this.setState({ walCount: c }));
  }

  listRenewed(accounts) {
    if (accounts) {
      this.setState({ walCount: accounts.length });
    } else this.setState({ walCount: undefined });
  }

  estimateWallets(): Promise {
    let _that = this;
    return new Promise(function(resolve, reject) {
      _that.setState({ processing: true });
      Auth.fetch(shconfig.mongo_api_accounts_crud_url + "&c=true")
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
        <div className="cards-container">
          <div className="cards">
            <Swiper {...params}>
              <div>
                <InfoCard
                  count={5000}
                  imageUrl={"/images/card-members.jpg"}
                  title={"Участников форума"}
                  cardStyle={{
                    backgroundColor: "#f6ebcd",
                    textAlign: "center"
                  }}
                />
              </div>
              <div>
                <InfoCard
                  count={this.state.walCount}
                  imageUrl="images/card-etherium.jpg"
                  title={"Кошельков Ethereum"}
                  cardStyle={{
                    backgroundColor: "#cbc2d2",
                    backgroundSize: "50%",
                    textAlign: "center"
                  }}
                />
              </div>
              <div>
                <InfoCard
                  count={500}
                  imageUrl="/images/card-books.jpg"
                  title={"Книг в магазинах Сбербанка"}
                  cardStyle={{
                    backgroundColor: "#a1dce4",
                    textAlign: "center"
                  }}
                />
              </div>
            </Swiper>
          </div>
        </div>

        <Typography
          variant="headline"
          align="center"
          style={{ paddingTop: "1rem" }}
        >
          Список счетов
        </Typography>

        <AccountList mode={"short"} listRenewed={this.listRenewed} />
      </div>
    );
  }
}
