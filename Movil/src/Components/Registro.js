import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { AppLoading } from 'expo';
import { Container, Header, Content, Card, CardItem,Item, Input, Label,Icon, Text, Body,Button, View } from 'native-base';
import * as Font from 'expo-font';
import Login  from "./Login";
import AsyncStorage  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export default class Registro extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      PrimerNombre:'',
      SegundoNombre:'',
      PrimerApellido:'',
      SegundoApellido:'',
      file:'' ,
      email:'',
      password:'',
      password_conf:'',
      imagen:{},
      Sexo:['Hombre','Mujer','Otro'],
      Edad:'',
      Telefono:''
    }
  }
  
  async componentDidMount() {
    this._loadInitialState();
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
    _loadInitialState=async()=>{
      var value =await AsyncStorage.getItem('user');
    }
  }
 
  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <Card style={styles.a}>
            <ScrollView>
              <CardItem header bordered >
                <Text style={styles.centerheader}>Inicio de registro</Text>
              </CardItem>
              <CardItem bordered>
                <Body>     
                  <Item floatingLabel>
                    <Icon name='person'></Icon>
                    <Label>Primer Nombre</Label>
                    <Input onChangeText={(PrimerNombre)=>this.setState({PrimerNombre})}/>
                  </Item>
                  <Item floatingLabel>
                    <Icon name='person'></Icon>
                    <Label>Segundo Nombre</Label>
                    <Input onChangeText={(SegundoNombre)=>this.setState({SegundoNombre})}/>
                  </Item>
                  <Item floatingLabel last>
                    <Label>Primer Apellido</Label>
                    <Input onChangeText={(PrimerApellido)=>this.setState({PrimerApellido})}/>
                  </Item>
                  <Item floatingLabel last>
                    <Label>Segundo Apellido</Label>
                    <Input onChangeText={(SegundoApellido)=>this.setState({SegundoApellido})}/>
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input onChangeText={(password)=>this.setState({password})} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password confirm</Label>
                    <Input onChangeText={(password_conf)=>this.setState({password_conf})}/>
                  </Item>
                  <Item floatingLabel last>
                    <Label>Telefono</Label>
                    <Input onChangeText={(Telefono)=>this.setState({Telefono})}/>
                  </Item>
                  <Item floatingLabel last>
                    <Label>Img</Label>
                    <Input onChangeText={(img)=>this.setState({img})}/>
                  </Item>
                  <Item floatingLabel last>
                    <Label>Email</Label>
                    <Input onChangeText={(email)=>this.setState({email})}/>
                  </Item>
                  <Item floatingLabel last>
                    <Label>Edad</Label>
                    <Input onChangeText={(Edad)=>this.setState({Edad})}/>
                  </Item>
                  <Item floatingLabel last>
                    <Label>sexo</Label>
                    <Input type="radio" onChangeText={(sexo)=>this.setState({sexo})}/>
                  </Item>
                </Body>
              </CardItem>
              <CardItem bordered style={{justifyContent:'center'}}>
                <TouchableOpacity style={styles.centerheaderba}>
                  <Button rounded style={styles.centerheaderbb} onPress={this.registros}>
                    <Text style={styles.centerheader}>Guardar</Text>
                  </Button> 
                </TouchableOpacity>
                <Text style={{width:10}}> </Text>
                <TouchableOpacity  style={styles.centerheaderba}>
                  <Button rounded style={styles.centerheaderbb}  onPress={() => this.props.navigation.navigate('Login')} >
                    <Text style={styles.centerheader}>login</Text>
                  </Button> 
                </TouchableOpacity >
              </CardItem>
            </ScrollView>
          </Card>
        </Content>
      </Container>
  );
}
registros=()=>{
  fetch('http://192.168.1.73:3001/api/Usuarios',{
    method:'POST', headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      PrimerNombre:this.state.PrimerNombre,
      SegundoNombre:this.state.SegundoNombre,
      PrimerApellido:this.state.PrimerApellido,
      SegundoApellido:this.state.SegundoApellido,
      email:this.state.email,
      password:this.state.password,
      password_conf:this.state.password_conf,
      Sexo:this.state.Sexo,
      Edad:this.state.Edad,
      Telefono:this.state.Telefono,
    })
  }).then((response)=>response.json()).then((res)=>{  
      if(res.success===true){
        alert(res.message);
        AsyncStorage.setItem('user',res.user);
        this.props.navigation.navigate('Login');
      }
      else{
        alert(res.message);
      }
    }).done();
  }
}

const styles=StyleSheet.create({
  centerheader:{
      width:'100%',
      textAlign:'center',
  }, 
  centerheaderba:{
      width:'50%',
      textAlign:'center',
  },
  centerheaderbb:{
      width:'100%',
      textAlign:'center',
  },
  a:{
      borderRadius:20,
      borderColor:'black',
      borderWidth:1,
  },
  content:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'#D0D0D0',        
  },
})