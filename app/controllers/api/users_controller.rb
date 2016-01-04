class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
  def current
    @user = current_user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :current
    else
      render json: @user.errors.full_messages
    end
  end

  def login
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      if(@user.username) == "Guest"
        reset_guest_info(@user)
      end
      sign_in(@user)
      render :current
    else
      render json: ["Invalid username or password."]
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :description, :img_url)
  end

  def reset_guest_info(user)
    user.update({description: "It's cool, I'm just too lame to get a real account."})
    id = user.id
    Poem.destroy_all(author_id: id)

    @style = Style.create(color_range:13);
    @poem = Poem.create({id: 9, created_at:"2015-12-22T07:13:16.572Z", style_id:@style.id, author_id:id, book_id:9, passage:"behind which sat a small man with a head that was even redder than mine. He said a few words to each candidate as he came up, and then he always managed to find some fault in them which would disqualify them. Getting a vacancy did not seem to be such a very easy matter, after all. However, when our turn came the little man was much more favourable to me than to any of the others, and he closed the door as we entered, so that he might have a private word with us. \"'This is Mr. Jabez Wilson,' said my assistant, 'and he is willing to fill a vacancy in the League.' \"'And he is admirably suited for it,' the other answered. 'He has every requirement. I cannot recall when I have seen anything so fine.' He took a step backward, cocked his head on one side, and gazed at my hair until I felt quite bashful. Then suddenly he plunged forward, wrung my hand, and congratulated me warmly on my success. \"'It would be injustice to hesitate,' said he. 'You will, however, I am sure, excuse me for taking an"})
    poem_id1 = @poem.id
    SelectedText.create([{start_idx: 96, end_idx:111, poem_id: @poem.id}, {start_idx: 186, end_idx:207, poem_id: @poem.id}, {start_idx: 421, end_idx:424, poem_id: @poem.id}, {start_idx: 429, end_idx:438, poem_id: @poem.id}, {start_idx: 504, end_idx:510, poem_id: @poem.id}, {start_idx: 737, end_idx:741, poem_id: @poem.id}, {start_idx: 834, end_idx:835, poem_id: @poem.id}, {start_idx: 836, end_idx:837, poem_id: @poem.id}, {start_idx: 845, end_idx:846, poem_id: @poem.id}, {start_idx: 891, end_idx:900, poem_id: @poem.id}])

    @style = Style.create(color_range:5);
    @poem = Poem.create({id: 13, created_at:"2015-12-22T08:30:10.958Z", id: 10, style_id:@style.id, author_id:id, book_id:3, created_at:"2015-12-22T08:14:56.313Z", passage:"s among men that my mother died--in the cages of the king's palace at Oodeypore. It was because of this that I paid the price for thee at the Council when thou wast a little naked cub. Yes, I too was born among men. I had never seen the jungle. They fed me behind bars from an iron pan till one night I felt that I was Bagheera--the Panther--and no man's plaything, and I broke the silly lock with one blow of my paw and came away. And because I had learned the ways of men, I became more terrible in the jungle than Shere Khan. Is it not so?\" \"Yes,\" said Mowgli, \"all the jungle fear Bagheera--all except Mowgli.\" \"Oh, thou art a man's cub,\" said the Black Panther very tenderly. \"And even as I returned to my jungle, so thou must go back to men at last--to the men who are thy brothers--if thou art not killed in the Council.\" \"But why--but why should any wish to kill me?\" said Mowgli. \"Look at me,\" said Bagheera. And Mowgli looked at him steadily between the eyes. The big panther turned his head"})
    SelectedText.create([{start_idx: 200, end_idx:216, poem_id: @poem.id}, {start_idx: 245, end_idx:250, poem_id: @poem.id}, {start_idx: 372, end_idx:378, poem_id: @poem.id}, {start_idx: 595, end_idx:612, poem_id: @poem.id}])

    @style = Style.create(color_range:4);
    @poem = Poem.create({id: 37, created_at:"2015-12-26T01:53:08.673Z", style_id:@style.id, author_id:id, book_id:7, passage:" religion. He was busy, he was much in the open air, he did good; his face seemed to open and brighten, as if with an inward consciousness of service; and for more than two months, the doctor was at peace. On the 8th of January Utterson had dined at the doctor's with a small party; Lanyon had been there; and the face of the host had looked from one to the other as in the old days when the trio were inseparable friends. On the 12th, and again on the 14th, the door was shut against the lawyer. \"The doctor was confined to the house,\" Poole said, \"and saw no one.\" On the 15th, he tried again, and was again refused; and having now been used for the last two months to see his friend almost daily, he found this return of solitude to weigh upon his spirits. The fifth night he had in Guest to dine with him; and the sixth he betook himself to Dr. Lanyon's. There at least he was not denied admittance; but when he came in, he was shocked at the change which had taken place in the doctor's appearanc"})
    SelectedText.create([{start_idx: 440, end_idx: 446, poem_id: @poem.id},{start_idx: 589, end_idx: 596, poem_id: @poem.id},{start_idx: 648, end_idx: 652, poem_id: @poem.id},{start_idx: 661, end_idx: 668, poem_id: @poem.id},{start_idx: 714, end_idx: 721, poem_id: @poem.id},{start_idx: 792, end_idx: 800, poem_id: @poem.id}])

    Like.create(poem_id: poem_id1, liker_id: 3, created_at:"2015-12-30T22:01:52.473Z", seen: true)
    Like.create(poem_id: @poem.id, liker_id: 2, created_at:"2016-01-04T17:48:16.914Z")
    Like.create(poem_id: poem_id1, liker_id: 1)

  end
end
