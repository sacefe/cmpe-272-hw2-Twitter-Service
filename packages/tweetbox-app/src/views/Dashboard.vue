<template>
    <b-container class="mt-4">
        <b-row>
            <b-col sm="12" lg="8">
                <!-- Send direct message -->
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
                <!-- Create new tweet -->
                <b-card class="shadow-sm mt-4 border-0" title="Tweet a status">
                    <b-form>
                        <b-form-group>
                            <b-textarea v-model="tweetStatus" placeholder="Enter a tweet."></b-textarea>
                        </b-form-group>
                        <b-btn @click="createTweetWithStatus" block variant="outline-primary">Create Tweet <fa icon="paper-plane" /></b-btn>
                    </b-form>
                </b-card>
                <!-- Delete tweet with id -->
                <b-card class="shadow-sm mt-4 border-0" title="Tweet Delete">
                    <b-form>
                        <b-form-group>
                               <b-input v-model="deleteId" placeholder="Enter tweet ID."></b-input> 
                        </b-form-group>
                        <b-btn @click="deleteTweetWithId" block variant="outline-primary">Delete Tweet <fa icon="trash-alt" /></b-btn>
                    </b-form>
                </b-card>
                
            </b-col>
            <b-col>
                <!-- User profile -->
                <b-card 
                class="shadow-sm border-0"
                >
                <div class="text-center">
                    <b-img :src="user.imageURL" rounded="circle" width="50"></b-img>
                    <h6 class="mt-2">Display Name: {{user.displayName}}</h6>
                    <h6>User name: {{user.userName}}</h6>
                </div>
                </b-card>
                <!-- Get tweet -->
                <b-card class="shadow-sm mt-4 border-0" title="Get Tweet">
                    <b-form>
                        <b-form-group>
                            <b-input v-model="tweetId" placeholder="Enter a tweet ID."></b-input>
                        </b-form-group>
                        <b-btn @click="getTweetWithID" block variant="outline-primary">Get Tweet <fa icon="arrow-down" /></b-btn>
                    </b-form>
                </b-card>
                <b-card v-if="displayTweet" class="shadow-sm mt-4 border-0" header-border-variant="light" header-bg-variant="white">
                    <template v-slot:header>
                        <h5 class="float-left mb-0">{{latestTweet.user.name}}</h5>
                        <b-img class="float-right" :src="latestTweet.user.profile_image_url_https" rounded="circle" width="25"></b-img>
                    </template>
                    <div>{{latestTweet.text}}</div>
                    <div class="float-right mb-0 text-muted small"><p class="small mb-0">{{latestTweet.created_at}}</p></div>
                </b-card>
            </b-col>
        </b-row>
        
    </b-container>
</template>

<script>
import {
    getUser,
    sendMessage, 
    createTweet,
    deleteTweet,
    getTweet,
    } from '@/services';
import swal from 'sweetalert';
export default {
    data: () => ({
        user: {
            imageURL: '',
            userName: '',
            displayName: ''
        },
        message: '',
        tweetStatus: '',
        recipientId: '',
        deleteId: '',
        loading: false,
        tweetId: '',
        latestTweet: {},
        displayTweet: false
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
        },
        async createTweetWithStatus() {
            try {
                if(this.tweetStatus !== '') {
                    const response = await createTweet(this.tweetStatus);
                    console.log(response);
                    swal('Success!', 'tweet created succesfully.', 'success');
                }
            } catch(err) {
                console.log(JSON.stringify(err));
                swal('Smething went wrong', 'sorry', 'error');
            }
        },
        async getTweetWithID() {
            try {
                if(this.tweetId !== '') {
                    const response = await getTweet(this.tweetId);
                    console.log(response);
                    this.latestTweet = response.data.result;
                    this.displayTweet = true;
                    swal('Success!', 'Got the tweet successfully.', 'success');
                } else {
                    swal('Uh oh!', 'Looks like you forgot to fill the fields mate.', 'warning');
                }
            } catch(err) {
                console.log(JSON.stringify(err));
                swal('Oh no (get Tweet)!', 'Something went wrong. Try again.', 'error');
            }
        },
        async deleteTweetWithId() {
            try{
                console.log("myID is: " + this.deleteId);
                if (this.deleteId !== ''){
                    const response = await deleteTweet(this.deleteId);
                    console.log(response);
                    swal('Deleted!', 'tweet deleted sucessfully.', 'success');
                }else{
                      swal('Uh oh!', 'Looks like you forgot to fill the fields mate.', 'warning');
                }
            } catch(err) {
                console.log(JSON.stringify(err));
                swal('something get wrong deleting a tweet', 'error');
            }
        }
    }
}
</script>
