import logo from './logo.svg';
import './App.css';
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Jimp from 'jimp';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { SketchPicker } from 'react-color';



const InputSlider = (props) => {
  const [value, setValue] = React.useState(
    30
  );

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.changeHandler(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    props.changeHandler(event.target.value);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 200) {
      setValue(400);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {props.name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FontDownloadIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            max={400}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            id={"input-" + props.name.split(" ").join("-")}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 400,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Rasm
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

class TextGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      emHeight: 0,
      emWidth: 0,
      fontSize: '30px',
      color: '#ffffff',
    };
  }

  draw = () => {

    var msg = document.getElementById('inp').value.replaceAll('\n', '<br>');
    var d = document.createElement("span",);
    // d.style.visibility = 'hidden';
    d.style.fontSize = this.state.fontSize;
    d.style.fontFamily = '"Arial"';
    // no line-break
    d.style.whiteSpace = 'nowrap';
    d.style.display = 'inline';
    d.innerHTML = msg;
    document.body.appendChild(d);
    msg = msg.split("<br>");
    let height = d.offsetHeight + d.offsetHeight / 80;
    if (msg.length > 1) {
      height = d.offsetHeight * (msg.length);
    }
    this.setState({
      text: msg,
      emWidth: d.offsetWidth + d.offsetWidth / 30,
      emHeight: height,
    }, () => {

      document.body.removeChild(d);
      var canvas = document.getElementById('idCanvas');
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.width = this.state.emWidth;
      context.height = this.state.emHeight;
      // context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = this.state.fontSize + " Arial";
      context.fillStyle = this.state.color;
      // console.log(msg, context.font, document.getElementById('inp').value.replaceAll('\n', '<br>'));
      if (msg.length > 1 && msg[0].length > 0) {
        for (var i = 0; i < msg.length; i++) {
          context.fillText(msg[i], this.state.emWidth / 80, ((i + 1) * d.offsetHeight));
        }
      }
      else if (msg.length == 1 && msg[0].length > 0) {
        context.fillText(msg[0], this.state.emWidth / 80, this.state.emHeight / 1.5);
      }
      else {
        context.fillText('', 0, 0);
        document.getElementById('text').innerHTML = '';
        // document.getElementById('img').src = '#';

      }



      var canvas = document.getElementById('idCanvas');
      var dataURL = canvas.toDataURL();
      // document.getElementById('img').src = dataURL;
      Jimp.read(dataURL).then(function (image) {
        // get luminance
        var new_width = parseInt(document.getElementById('input-Art-Size').value * document.getElementById('inp').value.replace('\n', '').length / 10);
        var new_height = parseInt(new_width * image.bitmap.height / image.bitmap.width);
        image.resize(new_width, new_height);
        image = image.grayscale();
        var luminances = []
        var ASCII_CHARS = [' ', '.', ':', '-', '+', '*', '?', '%', 'S', '#', 'o', '@', '&', '$', '!', ';', ','];
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
          var red = this.bitmap.data[idx];
          var green = this.bitmap.data[idx + 1];
          var blue = this.bitmap.data[idx + 2];
          var alpha = this.bitmap.data[idx + 3];
          var luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
          luminances.push(luminance);
        });

        var ascii_str = "";
        var pixels = luminances;


        for (var i = 0; i < new_height - 1; i++) {
          var row = new_width * i;
          var row_chars = '';
          for (var j = 0; j < new_width; j++) {
            row_chars += ASCII_CHARS[parseInt(pixels[row + j] / 25)];
          }
          // if (row_chars.indexOf('@') != -1 || ascii_str.slice(-100, -1).indexOf('@') != -1) {
          //   ascii_str += row_chars + '\n';
          // }
          ascii_str += row_chars + '\n';
        }
        document.getElementById('text').innerHTML = ascii_str;

      });

    }
    );

  };

  render() {
    return (
      <div className="App">
        <SearchAppBar />

        <header className="App-header">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <InputSlider changeHandler={(value) => {
              this.setState({ fontSize: value + 'px' },
                () => {
                  this.draw();
                }
              )

            }} name="Font Size" />
            <InputSlider name="Art Size"
              changeHandler={(value) => {
                this.draw();
              }}

            />
            <InputSlider name="Spacing" />
            <SketchPicker color={this.state.color}
              onChangeComplete={(color) => {
                this.setState({ color: color.hex },
                  () => {
                    // this.draw();
                  }
                )
              }} />

          </Stack>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '80%',

          }}>
            <pre float='left' id='text'
              style={{
                width: '80%',
                overflow: 'scroll',
                wordWrap: 'break-word',
                webkitNbspMode: 'space',
                lineBreak: 'after-white-space',
                WebkitUserModify: 'read-write',
              }}
            ></pre>
          </div>
          {/* <textarea id='inp' placeholder='text' style={{
            multiline: 'true',
          }}
            onChange={this.draw}

          /> */}
          <TextField
            id="inp"
            label="Enter text"
            multiline
            placeholder='text'
            variant="standard"
            onChange={this.draw}
          />
          <Button variant="contained" onClick={this.draw}
            style={{
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >Draw</Button>
          <canvas style={{
            display: 'none',
          }} id="idCanvas" width={this.state.emWidth} height={this.state.emHeight}></canvas>
        </header>
      </div>
    );
  }
}

function App() {

  return (

    <TextGenerator />
  );
}

export default App;
