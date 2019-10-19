<template>
    <b-container class="mt-4">
        <b-row>
            <b-col sm="12" lg="8">
                <b-card class="shadow-sm border-0" title="Send Direct Message">
                    <b-form>
                        <b-form-group>
                            <b-input v-model="recipientId" placeholder="Enter a recipient."></b-input>
                        </b-form-group>
                        <b-form-group>
                            <b-textarea v-model="message" placeholder="Enter a message."></b-textarea>
                        </b-form-group>
                        <b-btn @click="sendMessageTwitter" block variant="outline-primary">Send Message <fa icon="paper-plane" /></b-btn>
                    </b-form>
                </b-card>
            </b-col>
            <b-col>
                <b-card 
                class="shadow-sm border-0"
                >
                <div class="text-center">
                    <b-img :src="user.imageURL" rounded="circle" width="50"></b-img>
                    <h6>Display Name: {{user.displayName}}</h6>
                    <h6>User name: {{user.userName}}</h6>
                </div>
                </b-card>
            </b-col>
        </b-row>
        
    </b-container>
</template>

<script>
import {getUser, sendMessage} from '@/services';
import swal from 'sweetalert';
export default {
    data: () => ({
        user: {
            imageURL: '',
            userName: '',
            displayName: ''
        },
        message: '',
        recipientId: '',
        loading: false
    }),
    mounted() {
        this.loadUser();
    },
    methods: {
        async loadUser() {
            try{
                const response = await getUser();
                this.user.imageURL = response.data.user.image;
                this.user.userName = response.data.user.username;
                this.user.displayName = response.data.user.displayName;
                swal(`Hi ${this.user.displayName}!`, 'Connected to twitter successfully.', 'success');
            }catch(err) {
                console.log(err);
                swal('Sorry!', 'Couldn\'t connect to twitter, try again.', 'error');
            }
        },
        async sendMessageTwitter() {
            try {
                if(this.recipientId !== '' || this.message !== '') {
                    const response = await sendMessage(this.recipientId, this.message);
                    console.log(response);
                    swal('Success!', 'message sent succesfully.', 'success');
                } else {
                    swal('Uh oh!', 'Looks like you forgot to fill the fields mate.', 'warning');
                }
            } catch(err) {
                console.log(err);
                swal('Oh no!', 'Something went wrong. Try again.', 'error');
            }
        }
    }
}
</script>
