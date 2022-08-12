import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import {Form, Button, Row,ListGroup } from 'react-bootstrap';

const ShowErrors = ({errors}) => {
  return(
    <ListGroup as="ol" numbered  style={{marginLeft: '-20px'}}>
      {
        errors.map((error, i) => <ListGroup.Item as="li" variant="danger" key={i}>{error}</ListGroup.Item>)
      }
    </ListGroup>
  )
}

class Validation extends React.Component {
  state = {
    nama : '',
    gender : '',
    alamat : '',
    nohp : '',
    email : '',
    password : '',
    errors : []
  }

  handleSubmit =  event => {
    event.preventDefault();

    const {nama, gender, alamat, nohp, email, password} = this.state;
    let message = [];

    if(nama.length === 0){
      message = [...message,'Isikan nama anda!']
    } else if (nama === Number ) {
      message = [...message, 'Nama tidak boleh mengandung angka']
    }
    console.log(typeof nama)

    if(gender.length === 0){
      message = [...message, 'Pilih Jenis Kelamin']
    }

    if(alamat.length === 0){
      message = [...message, 'Isikan alamat anda!']
    }

    if(nohp.length === 0){
      message = [...message, 'Isikan No Handphone anda']
    } else if (nohp < 12){
      message = [...message, 'No Handphone kurang dari 12 angka']
    } 

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.length === 0){
      message = [...message, 'Isikan email anda']
    }else if(!re.test(String(email).toLowerCase())){
      message = [...message, 'Email tidak sesuai']
    }

    if(password.length === 0){
      message = [...message, 'Isikan password anda!']
    }else if (password.length< 8){
      message = [...message, 'password minimal 8 karakter']
    }

    if(message.length > 0){
      this.setState({
        errors : message
      });
    } else {
      alert(`
        Nama : ${this.state.nama}
        Jenis Kelamin : ${this.state.gender}
        Alamat : ${this.state.alamat}
        No. Handphone : ${this.state.nohp}
        Email : ${this.state.email}
        Password : ${this.state.password}
      `);

      this.setState({
        errors : []
      });

    }
  }

  render(){
    return(
       <div>
          <div className="container">
            <h1>Validasi Form Registrasi</h1>
            {
              this.state.errors && <ShowErrors errors={this.state.errors}/>
            }
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Row className="input-item">
                  <Form.Label htmlFor="nama">Nama :</Form.Label>
                  <Form.Control type="text" name='nama' onChange={e => this.setState ({nama : e.target.value})}/>
                </Row>
                <Row className="input-item">
                  <Form.Label htmlFor="gender">Jenis Kelamin :</Form.Label>
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="Laki-laki"
                        name="group1"
                        type={type}
                        value="Pria"
                        id={`inline-${type}-1`}
                        onChange={e => this.setState ({gender : e.target.value})}
                      />
                      <Form.Check
                        inline
                        label="Perempuan"
                        name="group1"
                        type={type}
                        value="Wanita"
                        id={`inline-${type}-2`}
                        onChange={e => this.setState ({gender : e.target.value})}
                      />
                    </div>
                    ))}
                </Row>
                <Row className="input-item">
                  <Form.Label htmlFor="alamat">Alamat :</Form.Label>
                  <Form.Control as="textarea" name='alamat' rows={3} onChange={e => this.setState ({alamat : e.target.value})}/>
                </Row>
                <Row className="input-item">
                  <Form.Label htmlFor="nohp">Nomor Handphone :</Form.Label>
                  <Form.Control type="tel" pattern="[0-9]{12}" name='nohp' onChange={e => this.setState ({nohp : e.target.value})}/>
                </Row>
                <Row className="input-item">
                  <Form.Label htmlFor="email">Email :</Form.Label>
                  <Form.Control type="email" name='email' onChange={e => this.setState ({email : e.target.value})}/>
                </Row>
                <Row className="input-item">
                  <Form.Label htmlFor="password">Password :</Form.Label>
                  <Form.Control type="password" name='password' onChange={e => this.setState ({password : e.target.value})}/>
                </Row>
                <Button size="lg" className='btn' type="submit" value="Submit"> Registrasi </Button>
              </Form.Group>
            </Form>
            
          </div>
       </div>
    )
  }
}

export default Validation;
