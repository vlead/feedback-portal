import urllib

from flask import Flask, render_template, request, redirect, url_for, json,\
    flash
import requests

import config

app = Flask(__name__)
app.config.from_object(config)

# fb_ref = 'http://virtual-labs.ac.in/labs/cse01/'
# fb_ref = 'http://iitk.vlab.co.in/?sub=27&brch=83&sim=725&cnt=2'
# fb_ref = 'http://iitk.vlab.co.in/?sub=27&brch=83&sim=725&cnt=4'


@app.route('/', methods=['GET', 'POST'])
def feedback_form():
    if request.method == 'GET':
        fb_ref = request.referrer
        print fb_ref
        if fb_ref:
            response = requests.get(config.DS_URL +
                                    '/experiments?content_url=' +
                                    urllib.quote(fb_ref))
            if len(response.json()) > 0:
                experiment = response.json()[0]
                return render_template('feedback.html',
                                       lab_name=experiment['lab']['name'],
                                       lab_id=experiment['lab']['id'],
                                       expt_name=experiment['name'],
                                       expt_id=experiment['id'])
            else:
                response = requests.get(config.DS_URL +
                                        '/experiments?simulation_url=' +
                                        urllib.quote(fb_ref))
                if len(response.json()) > 0:
                    experiment = response.json()[0]
                    return render_template('feedback.html',
                                           lab_name=experiment['lab']['name'],
                                           lab_id=experiment['lab']['id'],
                                           expt_name=experiment['name'],
                                           expt_id=experiment['id'])

                else:
                    # this calls the genric feedback
                    return render_template('feedback.html')

        else:
            # this calls the generic feedback
            return render_template('feedback.html')

    if request.method == 'POST':
        feedback_data = request.form.to_dict()
        if request.form.get('lab'):
            feedback_data['lab'] = {'id': request.form.get('lab')}

        if request.form.get('experiment'):
            feedback_data['experiment'] = {'id':
                                           request.form.get('experiment')}

        feedback_data['ip'] = request.remote_addr
        print json.dumps(feedback_data)
        response = requests.post(config.DS_URL + '/feedback',
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
