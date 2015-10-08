from flask import Flask, render_template, request, redirect, url_for, json, flash
import requests
import urllib

app = Flask(__name__)
app.secret_key = 'some_key'

# This will identify the address of the webpage that
# requested the feedback form. By checking the referrer,
# we can see from where the request originated.
# def feedback_referrer():
# ref = unicode(request.referrer)
# return ref

# fb_ref = urllib.quote('http://virtual-labs.ac.in/labs/cse01/')
# fb_ref = urllib.quote('http://iitk.vlab.co.in/?sub=27&brch=83&sim=725&cnt=2')
# fb_ref = urllib.quote('http://iitk.vlab.co.in/?sub=27&brch=83&sim=725&cnt=4')
fb_ref = None


@app.route('/', methods=['GET', 'POST'])
def feedback_form():
    if request.method == 'GET':
        if fb_ref is not None:
            response = requests.get('http://10.2.58.25:5000/labs?hosted_url=' + fb_ref)
            if len(response.json()) != 0:
                lab = response.json()
                return render_template('feedback.html',
                                       lab_name=lab[0]['name'],
                                       lab_id=lab[0]['id'])

            else:
                response = requests.get('http://10.2.58.25:5000/experiments?content_url=' + fb_ref)
                if len(response.json()) != 0:
                    experiment = response.json()
                    return render_template('feedback.html',
                                           lab_name=experiment[0]['lab']['name'],
                                           lab_id=experiment[0]['lab']['id'],
                                           expt_name=experiment[0]['name'],
                                           expt_id=experiment[0]['id'])
                else:
                    response = requests.get('http://10.2.58.25:5000/experiments?simulation_url=' + fb_ref)
                    if len(response.json()) != 0:
                        experiment = response.json()
                        return render_template('feedback.html',
                                               lab_name=experiment[0]['lab']['name'],
                                               lab_id=experiment[0]['lab']['id'],
                                               expt_name=experiment[0]['name'],
                                               expt_id=experiment[0]['id'])

        else:
            response = requests.get('http://10.2.58.25:5000/labs')
            print type(response.json())
            return render_template('feedback.html',
                                   labs_list=response.json())

    if request.method == 'POST':
        feedback_data = request.form.to_dict()
        feedback_data['lab'] = {'id': request.form.get('lab')}
        if not feedback_data['user_email']:
            feedback_data.pop('user_email')

        if request.form.get('experiment'):
            feedback_data['experiment'] = {'id':
                                           request.form.get('experiment')}
        else:
            feedback_data.pop('experiment')

        feedback_data['ip'] = request.remote_addr
        print json.dumps(feedback_data)
        response = requests.post('http://10.2.58.25:5000/feedback',
                                 data=json.dumps(feedback_data))
        if response.status_code == 200:
            return redirect(url_for('thanks'))
        else:
            flash('Error posting your feedback')
            return redirect(url_for('feedback_form'))


@app.route('/thanks')
def thanks():
    return render_template('thanks.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
