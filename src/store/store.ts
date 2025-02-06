import { defineStore } from 'pinia';
import { ISelected, ICost, IValues } from "../interfaces/index";
export const useStore = defineStore("store", {
    state: () => ({
        selected: {} as ISelected,
        values: {} as IValues,
        cost: {} as ICost,
    }),

    getters: {
        getSum: (state) => {
            if (Object.values(state.cost).length > 0) {
                return (
                    state.cost.minutes[state.selected.minutes] +
                    state.cost.sms[state.selected.sms] +
                    state.cost.internet[state.selected.internet] +
                    state.cost.rent[Number(state.selected.rent)]
                );
            }
        },
    },

    actions: {
        showResult(): void {
            let res =
            {
                "tel": this.selected.tel,
                "minutes": this.values.minutes[this.selected.minutes],
                "sms": this.values.sms[this.selected.sms],
                "internet": this.values.internet[this.selected.internet],
                "rent": this.selected.rent
            }
            alert(JSON.stringify(res))
        },

        getData(): void {
            fetch('../../db.json').then(response => {
                return response.json();
            }).then(data => {
                this.selected = data.selected
                this.values = data.values
                this.cost = data.cost

            }).catch(err => {
                console.log(err);
            });
        }
    },
}
)